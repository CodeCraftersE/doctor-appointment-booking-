import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { CustomCursor } from "@/components/CustomCursor";
import { BottomNav } from "@/components/BottomNav";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong max-w-md text-center p-10 rounded-3xl">
        <h1 className="text-7xl font-serif text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full gradient-deep px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => {
    const doctorName = import.meta.env.VITE_DOCTOR_NAME || "Dr. Sandip Das";
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" },
        { title: `${doctorName} – Classical Homeopathy | Natural Healing` },
        { name: "description", content: `Personalized classical homeopathic care with a gentle, natural approach. Book consultation with ${doctorName} in Howrah for skin, digestive, stress, immunity & chronic care.` },
        { name: "author", content: doctorName },
        { property: "og:title", content: `${doctorName} – Classical Homeopathy` },
        { property: "og:description", content: "Restore your health naturally with personalized homeopathic care." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap",
      },
    ],
  };
},
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <CustomCursor />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
}
