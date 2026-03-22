"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export function YandexMetrika() {
    const [consentGiven, setConsentGiven] = useState(false);

    useEffect(() => {
        const checkConsent = () => {
            if (localStorage.getItem("cookie_consent") === "accepted") {
                setConsentGiven(true);
            }
        };

        // Check initially
        checkConsent();

        // Listen for real-time updates from CookieConsent component
        window.addEventListener("cookie_consent_updated", checkConsent);
        return () => window.removeEventListener("cookie_consent_updated", checkConsent);
    }, []);

    if (!consentGiven) return null;

    return (
        <Script id="yandex-metrika" strategy="afterInteractive">
            {`
                (function(m,e,t,r,i,k,a){
                    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();
                    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108183930', 'ym');

                ym(108183930, 'init', {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                });
            `}
        </Script>
    );
}
