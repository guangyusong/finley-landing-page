"use client";

import { useEffect, useState } from "react";

function getCookie(name: string) {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : undefined;
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const val = getCookie("marketingConsent");
    if (!val) setVisible(true);
  }, []);

  const accept = () => {
    document.cookie = `marketingConsent=yes; max-age=${60 * 60 * 24 * 365}; path=/`;
    setVisible(false);
    const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
    if (portalId && !document.getElementById("hs-script-loader")) {
      const s = document.createElement("script");
      s.id = "hs-script-loader";
      s.async = true;
      s.defer = true;
      s.src = `https://js.hs-scripts.com/${portalId}.js`;
      document.body.appendChild(s);
    }
  };

  const decline = () => {
    document.cookie = `marketingConsent=no; max-age=${60 * 60 * 24 * 365}; path=/`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto z-50">
      <div className="mx-auto max-w-3xl rounded-2xl border-2 border-slate-200 bg-white/95 backdrop-blur p-4 sm:p-5 shadow-lg">
        <div className="sm:flex sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-slate-700">
            We’d like to use analytics and marketing cookies to improve our services. You can accept or decline — we only load marketing scripts with your consent.
          </p>
          <div className="mt-3 sm:mt-0 flex gap-2 shrink-0">
            <button onClick={decline} className="px-4 py-2 rounded-full border-2 border-slate-300 text-slate-700 text-sm font-semibold hover:border-slate-400">
              Decline
            </button>
            <button onClick={accept} className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 text-white text-sm font-semibold hover:shadow-lg hover:shadow-orange-600/25">
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

