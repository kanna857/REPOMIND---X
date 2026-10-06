import PortfolioPage from '../page';

export function generateStaticParams() {
  return [
    { username: 'kanna857' },
    { username: 'octocat' },
    { username: 'demo-cadet' },
  ];
}

export default function DynamicPortfolioPage() {
  return <PortfolioPage />;
}
