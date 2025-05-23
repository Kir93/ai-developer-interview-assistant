import CommonLayout from '@components/layout/CommonLayout';

export default function CommonPageLayout({ children }: { children: React.ReactNode }) {
  return <CommonLayout>{children}</CommonLayout>;
}
