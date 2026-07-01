"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    // If we receive an OAuth token at any path other than /archieve_login,
    // it's likely because Supabase defaulted to the Site URL due to missing Redirect URL config.
    // We intercept it and forward it to the correct login page to process.
    if (window.location.hash && window.location.hash.includes("access_token=")) {
      if (window.location.pathname !== "/archieve_login") {
        router.push("/archieve_login" + window.location.hash);
      }
    }
  }, [router]);

  return null;
}
