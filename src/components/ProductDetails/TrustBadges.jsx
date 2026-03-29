import { MdPets, MdEco, MdScience, MdVerified } from "react-icons/md";

export default function TrustBadges() {
  const badges = [
    { icon: MdPets, title: "Pet Friendly", desc: "Safe for your furry friends" },
    { icon: MdEco, title: "Plant Based", desc: "100% natural ingredients" },
    { icon: MdScience, title: "Lab Tested", desc: "Proven virus elimination" },
    { icon: MdVerified, title: "EWG Verified", desc: "Highest safety standards" },
  ];

  return (
    <section className="mt-20 py-12 border-t border-slate-100 dark:border-white/10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {badges.map((badge, idx) => (
          <div key={idx} className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <badge.icon className="text-3xl" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {badge.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-secondary-text">{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
