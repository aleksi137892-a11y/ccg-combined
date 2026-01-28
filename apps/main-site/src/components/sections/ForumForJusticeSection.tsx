import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "@/components/ScrollReveal";
import forumPhoto from "@/assets/forum-user-photo-alt.jpg";

const ForumForJusticeSection: React.FC = () => {
  const { language } = useLanguage();

  const appeals = [
    {
      number: "I",
      title: language === "en" ? "An Appeal to Law" : "მიმართვა კანონს",
      description:
        language === "en"
          ? "Constitutional violations demand constitutional remedies."
          : "კონსტიტუციური დარღვევები კონსტიტუციურ საშუალებებს მოითხოვს.",
      detail:
        language === "en"
          ? "Documenting breaches of due process, electoral law, and constitutional order—building the evidentiary foundation for future accountability."
          : "სამართლებრივი პროცესის, საარჩევნო კანონმდებლობისა და კონსტიტუციური წესრიგის დარღვევების დოკუმენტირება—მომავალი ანგარიშვალდებულებისთვის მტკიცებულებების ბაზის შექმნა.",
    },
    {
      number: "II",
      title: language === "en" ? "An Appeal to Public Responsibility" : "მიმართვა საჯარო პასუხისმგებლობას",
      description:
        language === "en"
          ? "Those who hold power must answer to those who grant it."
          : "ძალაუფლების მატარებლები მათ წინაშე უნდა აგონ პასუხი, ვინც მას ანიჭებს.",
      detail:
        language === "en"
          ? "Naming individuals and institutions that failed their oaths—creating a public record of complicity and courage alike."
          : "იმ პირებისა და ინსტიტუტების დასახელება, რომლებმაც თავიანთი ფიცი დაარღვიეს—თანამზრახველობისა და სიმამაცის საჯარო ჩანაწერის შექმნა.",
    },
    {
      number: "III",
      title: language === "en" ? "An Appeal to Imagination" : "მიმართვა წარმოსახვას",
      description:
        language === "en"
          ? "A republic renewed begins with citizens who dare to envision it."
          : "განახლებული რესპუბლიკა იწყება მოქალაქეებით, რომლებსაც ამის წარმოდგენის გამბედაობა აქვთ.",
      detail:
        language === "en"
          ? "Proposing reforms, drafting principles, and imagining what a restored democracy could become—turning grief into a blueprint."
          : "რეფორმების შეთავაზება, პრინციპების შემუშავება და აღდგენილი დემოკრატიის წარმოდგენა—მწუხარების გეგმად გარდაქმნა.",
    },
  ];

  return (
    <section className="bg-navy text-background overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <ScrollReveal delay={0}>
          <div className="max-w-4xl mb-16 md:mb-20">
            <h2
              className={`font-display text-display text-background mb-6 ${
                language === "ge" ? "font-georgian" : ""
              }`}
            >
              {language === "en" ? "Forum for Justice" : "ფორუმი სამართლიანობისთვის"}
            </h2>
            <p
              className={`text-body-lg text-background/80 max-w-2xl ${
                language === "ge" ? "font-georgian" : ""
              }`}
            >
              {language === "en"
                ? "An open platform for citizens to deliberate on democratic accountability and the restoration of legitimate governance."
                : "ღია პლატფორმა მოქალაქეებისთვის დემოკრატიული ანგარიშვალდებულებისა და ლეგიტიმური მმართველობის აღდგენის საკითხებზე მსჯელობისთვის."}
            </p>
          </div>
        </ScrollReveal>

        {/* Pull Quote */}
        <ScrollReveal delay={50}>
          <blockquote className="max-w-5xl mb-16 md:mb-24 py-12 md:py-16">
            <p
              className={`font-display text-4xl md:text-6xl lg:text-7xl text-background italic font-light leading-[1.1] tracking-tight ${
                language === "ge" ? "font-georgian" : ""
              }`}
            >
              {language === "en"
                ? "\"Injustice anywhere is a threat to justice everywhere.\""
                : "„უსამართლობა სადმე საფრთხეა სამართლიანობისთვის ყველგან.\""}
            </p>
            <footer className="mt-8">
              <cite
                className={`text-body-lg text-background/60 not-italic tracking-wide uppercase ${
                  language === "ge" ? "font-georgian" : ""
                }`}
              >
                — Martin Luther King Jr.
              </cite>
            </footer>
          </blockquote>
        </ScrollReveal>

        {/* Two Column: Image + Appeals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image */}
          <ScrollReveal delay={100}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={forumPhoto}
                alt={
                  language === "en"
                    ? "Citizens assembled at the Forum for Justice"
                    : "ფორუმზე შეკრებილი მოქალაქეები"
                }
                className="w-full h-full object-cover forum-kenburns"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
          </ScrollReveal>

          {/* Appeals List */}
          <div className="space-y-8 lg:pt-4">
            {appeals.map((appeal, index) => (
              <ScrollReveal key={appeal.number} delay={200 + index * 100}>
                <article className="group border-l-2 border-background/30 pl-6 hover:border-background/60 transition-all duration-300 cursor-pointer">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-numeral text-2xl text-background/50 group-hover:text-background/70 transition-colors">
                      {appeal.number}
                    </span>
                    <h3
                      className={`font-display text-xl md:text-2xl text-background font-light ${
                        language === "ge" ? "font-georgian" : ""
                      }`}
                    >
                      {appeal.title}
                    </h3>
                  </div>
                  <p
                    className={`text-body text-background/70 ml-10 ${
                      language === "ge" ? "font-georgian" : ""
                    }`}
                  >
                    {appeal.description}
                  </p>
                  <p
                    className={`text-body-sm text-background/50 ml-10 mt-3 max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 ease-out ${
                      language === "ge" ? "font-georgian" : ""
                    }`}
                  >
                    {appeal.detail}
                  </p>
                </article>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={550}>
              <div className="pt-6 ml-10">
                <Link
                  to="/projects/forum"
                  className={`inline-flex items-center gap-3 text-background hover:text-background/80 transition-colors group ${
                    language === "ge" ? "font-georgian" : ""
                  }`}
                >
                  <span className="text-label border-b border-current pb-0.5">
                    {language === "en" ? "Enter the Forum" : "შევიდეთ ფორუმში"}
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForumForJusticeSection;
