import StaffDepositForm from "@/components/deposit/StaffDepositForm";

// Internal tool: never indexed. The page itself is inert without the staff
// password, which the API checks on every call (see
// api/staff/deposit-link) — hiding this URL is not the protection.
export const metadata = { title: "Deposit links (staff)", robots: { index: false, follow: false } };

export default function StaffDepositPage() {
  return (
    <main>
      <StaffDepositForm />
    </main>
  );
}
