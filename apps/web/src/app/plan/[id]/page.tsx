import MissionPlanClient from './MissionPlanClient';
import { ISSUES_DATA } from '../../../lib/data';

export function generateStaticParams() {
  return ISSUES_DATA.map((issue) => ({
    id: issue.id,
  }));
}

export default function MissionPlanPage() {
  return <MissionPlanClient />;
}
