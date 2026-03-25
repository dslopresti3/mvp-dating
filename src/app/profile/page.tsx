import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Set your sports interests and dating preferences for better event matches."
      />
      <SectionCard
        title="Starter profile"
        description="This is placeholder content for your bio, favorite teams, and availability."
      >
        <ul className="space-y-2 text-sm text-zinc-700">
          <li>• Favorite teams: Knicks, Yankees</li>
          <li>• Preferred events: Night games, playoff atmosphere</li>
          <li>• Looking for: Easygoing, social fans</li>
        </ul>
      </SectionCard>
    </>
  );
}
