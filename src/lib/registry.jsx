import TiltCard from "@/components/reactbits/TiltCard.jsx";
import { Type } from "lucide-react";

export const COMPONENT_REGISTRY = {
  HeroSection: {
    name: "Hero Section",
    category: "Components",
    defaultProps: {
      paddingTop: 64,
      paddingBottom: 64,
      backgroundColor: "transparent",
      title: "Build Beautiful Websites Visually",
      titleColor: "#0f172a",
      subtitle: "Welcome to our platform",
      subtitleColor: "#2563eb",
      description: "Create stunning, responsive websites without writing a single line of code.",
      descriptionColor: "#64748b",
      showPrimaryButton: true,
      primaryButtonText: "Get Started",
      showSecondaryButton: true,
      secondaryButtonText: "Learn More",
    },
    render: ({ props }) => (
      <div 
        style={{ 
          paddingTop: props.paddingTop, 
          paddingBottom: props.paddingBottom, 
          backgroundColor: props.backgroundColor === "transparent" ? undefined : props.backgroundColor 
        }} 
        className={`px-8 text-center rounded-xl ${props.backgroundColor === 'transparent' || !props.backgroundColor ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50' : ''}`}
      >
        <p style={{ color: props.subtitleColor }} className="text-sm font-semibold tracking-wide uppercase mb-3">
          {props.subtitle}
        </p>
        <h1 style={{ color: props.titleColor }} className="text-4xl font-extrabold mb-4 leading-tight">
          {props.title}
        </h1>
        <p style={{ color: props.descriptionColor }} className="text-lg max-w-md mx-auto mb-8">
          {props.description}
        </p>
        <div className="flex gap-3 justify-center">
          {props.showPrimaryButton && (
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition-[background-color]">
              {props.primaryButtonText}
            </button>
          )}
          {props.showSecondaryButton && (
            <button className="px-6 py-2.5 bg-white text-slate-700 rounded-lg font-medium text-sm border border-slate-200 hover:bg-slate-50 transition-[background-color]">
              {props.secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    )
  },
  TextBlock: {
    name: "Text Block",
    category: "Components",
    defaultProps: {
      paddingTop: 32,
      paddingBottom: 32,
      title: "Our Features",
      titleColor: "#1e293b",
      content: "Drag and drop components to build your perfect website. Customize every aspect with our intuitive property panel.",
      contentColor: "#64748b",
      textAlign: "left",
    },
    render: ({ props }) => (
      <div style={{ paddingTop: props.paddingTop, paddingBottom: props.paddingBottom, textAlign: props.textAlign }} className="px-8">
        <h2 style={{ color: props.titleColor }} className="text-2xl font-bold mb-3">{props.title}</h2>
        <p style={{ color: props.contentColor }} className="leading-relaxed">
          {props.content}
        </p>
      </div>
    )
  },
  CardsGrid: {
    name: "Cards Grid",
    category: "Components",
    defaultProps: {
      paddingTop: 24,
      paddingBottom: 24,
      columns: 3,
      card1Title: "Fast",
      card1Desc: "Lightning quick performance",
      card2Title: "Beautiful",
      card2Desc: "Stunning visual design",
      card3Title: "Responsive",
      card3Desc: "Works on all devices",
      card4Title: "Secure",
      card4Desc: "Enterprise grade security"
    },
    render: ({ props }) => {
      const colClass = props.columns === 1 ? 'grid-cols-1' : props.columns === 2 ? 'grid-cols-2' : props.columns === 4 ? 'grid-cols-4' : 'grid-cols-3';
      
      const cardsData = [
        { title: props.card1Title, desc: props.card1Desc, color: "blue", id: "1" },
        { title: props.card2Title, desc: props.card2Desc, color: "purple", id: "2" },
        { title: props.card3Title, desc: props.card3Desc, color: "pink", id: "3" },
        { title: props.card4Title, desc: props.card4Desc, color: "green", id: "4" },
      ];

      return (
        <div style={{ paddingTop: props.paddingTop, paddingBottom: props.paddingBottom }} className={`px-8 grid ${colClass} gap-4`}>
          {cardsData.slice(0, props.columns).map(({ title, desc, color, id }) => (
            <TiltCard key={id} tiltAmount={6}>
              <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm text-left">
                <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      )
    }
  },
  Heading: {
    name: "Heading",
    category: "Text",
    defaultProps: {
      content: "Enter your heading here",
      color: "#0f172a",
      fontSize: 36,
      fontWeight: "bold",
      textAlign: "left",
      paddingTop: 8,
      paddingBottom: 8,
    },
    render: ({ props }) => (
      <h1 className="px-4" style={{ 
        color: props.color, 
        fontSize: `${props.fontSize}px`, 
        fontWeight: props.fontWeight,
        textAlign: props.textAlign,
        paddingTop: `${props.paddingTop}px`,
        paddingBottom: `${props.paddingBottom}px`,
      }}>
        {props.content}
      </h1>
    )
  },
  Subheading: {
    name: "Subheading",
    category: "Text",
    defaultProps: {
      content: "Enter your subheading",
      color: "#475569",
      fontSize: 24,
      fontWeight: "semibold",
      textAlign: "left",
      paddingTop: 8,
      paddingBottom: 8,
    },
    render: ({ props }) => (
      <h2 className="px-4" style={{ 
        color: props.color, 
        fontSize: `${props.fontSize}px`, 
        fontWeight: props.fontWeight,
        textAlign: props.textAlign,
        paddingTop: `${props.paddingTop}px`,
        paddingBottom: `${props.paddingBottom}px`,
      }}>
        {props.content}
      </h2>
    )
  },
  Paragraph: {
    name: "Paragraph",
    category: "Text",
    defaultProps: {
      content: "Enter your text here. You can use this block to display longer forms of text like descriptions, articles, or notes.",
      color: "#64748b",
      fontSize: 16,
      fontWeight: "normal",
      textAlign: "left",
      paddingTop: 8,
      paddingBottom: 8,
    },
    render: ({ props }) => (
      <p className="px-4" style={{ 
        color: props.color, 
        fontSize: `${props.fontSize}px`, 
        fontWeight: props.fontWeight,
        textAlign: props.textAlign,
        paddingTop: `${props.paddingTop}px`,
        paddingBottom: `${props.paddingBottom}px`,
      }}>
        {props.content}
      </p>
    )
  },
  Button: {
    name: "Button",
    category: "Buttons",
    defaultProps: {
      content: "Click Me",
      backgroundColor: "#2563eb",
      color: "#ffffff",
      borderRadius: 8,
      paddingX: 24,
      paddingY: 10,
      textAlign: "left",
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    },
    render: ({ props }) => (
      <div className="px-4 w-full" style={{ textAlign: props.textAlign }}>
        <button 
          style={{ 
            backgroundColor: props.backgroundColor, 
            color: props.color,
            borderRadius: `${props.borderRadius}px`,
            padding: `${props.paddingY}px ${props.paddingX}px`,
            marginTop: `${props.marginTop}px`,
            marginBottom: `${props.marginBottom}px`,
            marginLeft: `${props.marginLeft}px`,
            marginRight: `${props.marginRight}px`,
          }}
          className="font-medium inline-block text-sm transition-opacity hover:opacity-90 relative"
        >
          {props.content}
        </button>
      </div>
    )
  },
  SecondaryButton: {
    name: "Secondary Button",
    category: "Buttons",
    defaultProps: {
      content: "Learn More",
      backgroundColor: "#ffffff",
      color: "#0f172a",
      borderRadius: 8,
      paddingX: 24,
      paddingY: 10,
      textAlign: "left",
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    },
    render: ({ props }) => (
      <div className="px-4 w-full" style={{ textAlign: props.textAlign }}>
        <button 
          style={{ 
            backgroundColor: props.backgroundColor, 
            color: props.color,
            borderRadius: `${props.borderRadius}px`,
            padding: `${props.paddingY}px ${props.paddingX}px`,
            marginTop: `${props.marginTop}px`,
            marginBottom: `${props.marginBottom}px`,
            marginLeft: `${props.marginLeft}px`,
            marginRight: `${props.marginRight}px`,
          }}
          className="font-medium inline-block text-sm transition-opacity hover:bg-slate-50 border border-slate-200 relative"
        >
          {props.content}
        </button>
      </div>
    )
  },
  Image: {
    name: "Image",
    category: "Media",
    defaultProps: {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      alt: "Abstract landscape",
      borderRadius: 12,
      width: "100%",
    },
    render: ({ props }) => (
      <div className="px-4">
        <img 
          src={props.src} 
          alt={props.alt} 
          style={{ borderRadius: `${props.borderRadius}px`, width: props.width, maxWidth: '100%' }}
          className="object-cover mx-auto max-h-[400px]"
        />
      </div>
    )
  },
  Navbar: {
    name: "Navbar",
    category: "Components",
    defaultProps: {
      paddingTop: 16,
      paddingBottom: 16,
      backgroundColor: "#ffffff",
      logoText: "BrandName",
      links: "Home|/, Features|/features, Pricing|/pricing, Contact|/contact",
      showButton: true,
      buttonText: "Sign Up",
      buttonPosition: "right",
      textColor: "#0f172a"
    },
    render: ({ props }) => {
      const buttonNode = props.showButton ? <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors cursor-pointer pointer-events-auto shrink-0 relative z-50">{props.buttonText}</button> : null;
      return (
        <div style={{ paddingTop: props.paddingTop, paddingBottom: props.paddingBottom, backgroundColor: props.backgroundColor, color: props.textColor }} className="px-8 flex flex-wrap items-center justify-between border-b gap-4 border-slate-100/50">
          {props.buttonPosition === 'left' && buttonNode}
          <div className="font-bold text-xl tracking-tight shrink-0">{props.logoText}</div>
          {props.buttonPosition === 'center' && buttonNode}
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm opacity-80 font-medium">
            {props.links?.split(',').map((link, i) => {
              const [text, url] = link.split('|');
              return <a href={url ? url.trim() : "#"} target="_blank" rel="noopener noreferrer" key={i} className="hover:opacity-100 cursor-pointer pointer-events-auto relative z-50">{text?.trim()}</a>
            })}
          </div>
          {props.buttonPosition === 'right' && buttonNode}
        </div>
      );
    }
  },
  Footer: {
    name: "Footer",
    category: "Components",
    defaultProps: {
      paddingTop: 48,
      paddingBottom: 48,
      backgroundColor: "#0f172a",
      companyName: "BrandName Inc.",
      textColor: "#94a3b8",
      links: "Terms|/terms, Privacy|/privacy, Support|/support",
      bottomText: "© 2026 BrandName Inc. All rights reserved.",
    },
    render: ({ props }) => (
      <div style={{ paddingTop: props.paddingTop, paddingBottom: props.paddingBottom, backgroundColor: props.backgroundColor }} className="px-8 text-center flex flex-col items-center">
        <div className="font-bold text-xl text-white mb-4">{props.companyName}</div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm font-medium mb-6 opacity-80" style={{ color: props.textColor }}>
          {props.links?.split(',').map((link, i) => {
            const [text, url] = link.split('|');
            return <a href={url ? url.trim() : "#"} target="_blank" rel="noopener noreferrer" key={i} className="hover:opacity-100 cursor-pointer pointer-events-auto relative z-50">{text?.trim()}</a>
          })}
        </div>
        <p style={{ color: props.textColor }} className="text-sm">{props.bottomText}</p>
      </div>
    )
  }
};
