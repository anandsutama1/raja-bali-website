import StaffDepositForm from "@/components/deposit/StaffDepositForm";

// Internal tool: never indexed. The page itself is inert without the staff
// password, which the API checks on every call (see
// api/staff/deposit-link) — hiding this URL is not the protection.
//
// Preview text is spelled out (rather than inherited from the root layout,
// which describes the restaurant) so a shared link to this page reads as
// what it is. Page-level openGraph/twitter replace the root's wholesale.
const title = "Group deposit payment links";
const description = "Internal tool for creating group reservation deposit payment links.";
const image = "/images/shared/RajaBali_Navbar.png";

export const metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Raja Bali",
    title: `${title} | Raja Bali`,
    description,
    images: [{ url: image, width: 500, height: 500, alt: "Raja Bali" }],
  },
  twitter: { card: "summary", title: `${title} | Raja Bali`, description, images: [image] },
};

export default function StaffDepositPage() {
  return (
    <main>
      <StaffDepositForm />
    </main>
  );
}
