import { SignUp } from '@clerk/nextjs'

export const metadata = {
  icons: {
    icon: "/church.svg",
  },
};
export default function Page() {
  return <SignUp />
}