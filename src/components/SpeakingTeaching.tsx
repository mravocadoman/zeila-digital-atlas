import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Mic, Radio, Heart, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { T, useLang } from "@/i18n/lang";

const getCategories = (t: T) => [
  {
    id: "teaching",
    title: t("Academic Teaching & Lecturing", "Lekcijas augstskolās"),
    icon: GraduationCap,
    items: [
      {
        title: t("MBA Lecturer", "MBA lektors"),
        organization: t("Riga Business School", "Rīgas Biznesa skola"),
        period: t("2021 – Present", "2021 – šobrīd"),
        description: t("Created and led a 13-week MBA course in Digital Marketing with a strong emphasis on paid advertising: covered digital marketing strategy and channels, creative considerations, KPIs, and performance evaluation.", "Izveidoju un vadu 13 nedēļu MBA kursu digitālajā mārketingā ar uzsvaru uz maksāto reklāmu: stratēģija un kanāli, reklāmu radošā puse, KPI un rezultātu vērtēšana."),
        link: null
      },
      {
        title: t("Guest Lecturer", "Vieslektors"),
        organization: t("University of Lusaka", "Lusakas Universitāte"),
        period: t("May 2024", "2024. maijs"),
        description: t("International guest role via Riga Business School Erasmus+ educator programme, sharing digital marketing expertise with Zambian students.", "Erasmus+ vieslektors ar Rīgas Biznesa skolas starpniecību — digitālā mārketinga lekcijas Zambijas studentiem."),
        link: "https://www.facebook.com/permalink.php?story_fbid=pfbid0sbHi7MSF7Du61X8KCUM2qDwNdsBCd2dGGhQFa7fCBkpREh9Cz75VCHzvHZvPVEaUl&id=100000487541249"
      },
      {
        title: t("BBA Lecturer", "BBA lektors"),
        organization: t("RISEBA University", "Augstskola RISEBA"),
        period: "2023 – 2024",
        description: t("Developed, recorded, and graded lectures on social media management, content strategy, landing pages, and Meta advertising for RISEBA Bachelor's students.", "Izveidoju, ierakstīju un vērtēju lekcijas RISEBA bakalaura studentiem: sociālo tīklu vadība, satura stratēģija, mērķlapas un Meta reklāma."),
        link: null
      }
    ]
  },
  {
    id: "courses",
    title: t("Courses & Workshops", "Kursi un darbnīcas"),
    icon: Mic,
    items: [
      {
        title: t("Course Leader & Workshop Facilitator", "Kursu un darbnīcu vadītājs"),
        organization: t("LIFT Program (EU-Funded)", "LIFT programma (ES finansēta)"),
        period: t("2024 – Present", "2024 – šobrīd"),
        description: t("Lead monthly workshops on Meta ads and automation for Latvian SMEs; developed Meta Advertising Basics one-day intensives.", "Katru mēnesi vadu darbnīcas Latvijas uzņēmējiem par Meta reklāmām un automatizāciju; izveidoju vienas dienas intensīvo kursu “Meta reklāmas pamati”."),
        link: null
      },
      {
        title: t("Executive Education Course", "Kurss vadītājiem (Executive Education)"),
        organization: t("Riga Business School", "Rīgas Biznesa skola"),
        period: t("Nov 2024", "2024. nov."),
        description: t("Digital Marketing Growth Strategies for SMEs — practical course for small and medium-sized enterprises.", "“Digitālā mārketinga izaugsmes stratēģijas” — praktisks kurss maziem un vidējiem uzņēmumiem."),
        link: "https://www.facebook.com/RigaBusinessSchool/posts/pfbid0XEj9zWkXS18GTgPWW6rKHhkLT1BXdgzwb1TiNLtH4gEeBi1u37HtXTLZnwkBzGuSl"
      },
      {
        title: t("Digital Campaign Workshop Leader", "Digitālo kampaņu darbnīcas vadītājs"),
        organization: "Vidusdaugavas NVO centrs",
        period: t("Apr 2023", "2023. apr."),
        description: t("Hands-on training for NGOs on creating effective digital campaigns — combining theory with practical group exercises.", "Praktiskas apmācības NVO par to, kā veidot efektīvas digitālās kampaņas — teorija un darbs grupās."),
        link: "https://www.vidusdaugavasnvo.lv/lv/jaunumi/projekti/turpinas-vidusdaugavas-nvo-centra-realizetais-projekts-vidusdaugavas-nvo-centrs-digitalo-speju-attistisana-/"
      },
      {
        title: t("Youth Lecturer", "Lektors jauniešiem"),
        organization: "Medijpratējs / Digitālā Akadēmija",
        period: "2022",
        description: t("Delivered lectures on NGO work, digital tools, and digital marketing.", "Lekcijas par NVO darbu, digitālajiem rīkiem un digitālo mārketingu."),
        link: "https://www.facebook.com/medijpratejs/posts/pfbid02aYPbLyQqHhkDPfdqtqejx5jAdAF7GVe5QZhwY3caXEpBLvzbFSkKBkKnpdPzQtZTl"
      },
      {
        title: t("Workshop Facilitator", "Darbnīcu vadītājs"),
        organization: "Latvijas Digitālo ekspertu biedrība",
        period: "2019 – 2020",
        description: t("Developed entry-to-mid-level Facebook advertising course framework; conducted Facebook advertising workshops in Riga.", "Izveidoju Facebook reklāmas kursu iesācējiem un vidēji pieredzējušiem; vadīju Facebook reklāmas darbnīcas Rīgā."),
        link: "https://www.lde.lv/lektors/rihards/"
      },
      {
        title: t("Workshop Facilitator", "Darbnīcu vadītājs"),
        organization: t("International Trade Centre (ITC)", "Starptautiskais tirdzniecības centrs (ITC)"),
        period: t("Jan – Mar 2019", "2019. janv. – marts"),
        description: t("Implemented digital marketing programs in Kenya, Palestine, Gambia, and Jordan. Trained 100+ students and delivered fintech solutions for international SMEs.", "Vadīju digitālā mārketinga programmas Kenijā, Palestīnā, Gambijā un Jordānijā. Apmācīju vairāk nekā 100 cilvēku un ieviesu finanšu tehnoloģiju risinājumus vietējiem uzņēmumiem."),
        link: "https://www.facebook.com/permalink.php?story_fbid=pfbid0xVEbQHkGsJcLBf4PiN32sP6hyzVFxGo5xZou81eQVJmYdjRKbNq45CTivWirz67nl&id=100000487541249"
      }
    ]
  },
  {
    id: "appearances",
    title: t("Guest Appearances", "Uzstāšanās un intervijas"),
    icon: Radio,
    items: [
      {
        title: t("Interview Feature", "Intervija"),
        organization: "LAKUGA",
        period: t("Dec 2024", "2024. dec."),
        description: t("In-depth interview about world travel experiences, career journey, and digital marketing trends.", "Plaša intervija par ceļojumiem, karjeru un digitālā mārketinga tendencēm."),
        link: "https://www.lakuga.lv/2024/12/05/digitalais-pasauls-i-celuosona-kai-dzeivis-veids-saruna-ar-rihardu-zeilu/"
      },
      {
        title: t("Webinar Speaker", "Vebināra lektors"),
        organization: t("Latvia IT Cluster / European Digital Innovation Centre", "Latvijas IT klasteris / Eiropas Digitālās inovācijas centrs"),
        period: t("Oct 2024", "2024. okt."),
        description: t("AI in Digital Marketing — LIFT program webinar on leveraging artificial intelligence for business growth.", "“MI digitālajā mārketingā” — LIFT programmas vebinārs par to, kā izmantot mākslīgo intelektu uzņēmuma izaugsmei."),
        link: "https://www.facebook.com/events/551552717574429/"
      },
      {
        title: t("Podcast Guest", "Podkāsta viesis"),
        organization: "BSMS Podcast",
        period: t("Oct 2024", "2024. okt."),
        description: t("Episode on digital nomadism, having traveled to 33+ countries as founder of Mārketinga Skola.", "Saruna par digitālā nomada dzīvi: vairāk nekā 33 valstis, vienlaikus vadot Mārketinga Skolu."),
        link: "https://www.facebook.com/BSMSLatvia/posts/pfbid0jMPHXF5NihWx2QE8quEzC3FcC7iXmV6xFkxGzU8xFc4f5CZ7NUS69Y9ztUQUAdZPl"
      },
      {
        title: t("Podcast Guest", "Podkāsta viesis"),
        organization: "The Career Sensei",
        period: t("May 2024", "2024. maijs"),
        description: t("Exploring a Career in Digital Marketing — discussing insights on social media advertising, strategies, and trends reshaping the digital marketing landscape.", "“Karjera digitālajā mārketingā” — saruna par reklāmu sociālajos tīklos, stratēģijām un tendencēm, kas maina nozari."),
        link: "https://www.youtube.com/watch?v=JR9IiTZel9k"
      },
      {
        title: t("Panel Speaker", "Paneļdiskusijas dalībnieks"),
        organization: "Printful & Draugiem Group",
        period: t("Aug 2023", "2023. aug."),
        description: t("Panel discussion on business-academia collaboration and entrepreneurship education.", "Paneļdiskusija par uzņēmumu un augstskolu sadarbību un uzņēmējdarbības izglītību."),
        link: "https://www.facebook.com/events/1380105802543065/"
      },
      {
        title: t("TV/Radio Guest", "TV/radio viesis"),
        organization: "Žik! Raidījums",
        period: t("Oct 2022", "2022. okt."),
        description: t("Episode about influencers, bloggers, and youth entrepreneurship.", "Raidījums par influenceriem, blogeriem un jauniešu uzņēmējdarbību."),
        link: "https://www.facebook.com/watch/?v=810501230240311"
      },
      {
        title: t("Interview Feature", "Intervija"),
        organization: "Delfi",
        period: t("Oct 2022", "2022. okt."),
        description: t("Featured interview on digital nomad lifestyle and working remotely from Thailand.", "Intervija par digitālā nomada dzīvesveidu un darbu attālināti no Taizemes."),
        link: "https://www.delfi.lv/pieredzi-erasmus-plus/erasmus-ka-piedzivojums-un-iedvesma-mainit-nodarbosanos-riharda-stasts.d?id=54802938"
      },
      {
        title: t("Webinar Host", "Vebināra vadītājs"),
        organization: "LSUA",
        period: t("Aug 2020", "2020. aug."),
        description: t("Free webinar on effective client acquisition with Facebook paid ads, covering Ads Manager, Facebook Pixel, and targeting strategies.", "Bezmaksas vebinārs par klientu piesaisti ar Facebook reklāmām: Ads Manager, Facebook Pixel un mērķauditorijas."),
        link: "https://www.facebook.com/events/629017494698296/"
      },
      {
        title: t("Panel Speaker", "Paneļdiskusijas dalībnieks"),
        organization: t("Marketing Shake 2020 Conference", "Konference Marketing Shake 2020"),
        period: "2020",
        description: t("Panel on Facebook advertising strategies for low-budget or zero-budget scenarios.", "Diskusija par Facebook reklāmu ar mazu budžetu vai vispār bez tā."),
        link: null
      },
      {
        title: t("Webinar Host", "Vebināra vadītājs"),
        organization: "DarbaVieta",
        period: t("Oct 2019", "2019. okt."),
        description: t("Introduction to Facebook platform capabilities and trends, demonstrating how to find target audiences and create effective campaigns.", "Ievads Facebook iespējās un tendencēs: kā atrast savu mērķauditoriju un veidot efektīvas kampaņas."),
        link: null
      },
      {
        title: t("Podcast Guest", "Podkāsta viesis"),
        organization: "#5BREINUMI (YouTube/Podcast)",
        period: "2019",
        description: t("Discussed digital marketing, global travel experiences, and professional insights.", "Saruna par digitālo mārketingu, ceļojumiem un profesionālo pieredzi."),
        link: "https://www.youtube.com/watch?v=B6BE6QBBGYo&t=931s"
      }
    ]
  },
  {
    id: "volunteering",
    title: t("Volunteering", "Brīvprātīgais darbs"),
    icon: Heart,
    items: [
      {
        title: t("Mentor", "Mentors"),
        organization: "Future Heroes",
        period: "2023 – 2024",
        description: t("Mentored a team of 5 teenage girls on their entrepreneurial journey over a period of 9 months.", "9 mēnešus mentorēju piecu pusaudžu meiteņu komandu, kas veidoja savu uzņēmumu."),
        link: "https://www.facebook.com/FutureHeroesLatvia/posts/pfbid0gTCfSNRYscVtBPpjWNttRCfg33L3fWg5GZvXzsk7pxCE2DKj21fHXT1yvsw8gs1ml"
      },
      {
        title: t("Volunteer", "Brīvprātīgais"),
        organization: "Universidad Nacional de Colombia",
        period: t("Mar – Jun 2020", "2020. marts – jūn."),
        description: t("Supported educational initiatives and community outreach.", "Palīdzēju izglītības projektos un darbā ar vietējo kopienu."),
        link: null
      },
      {
        title: t("TEDx Volunteer", "TEDx brīvprātīgais"),
        organization: "TEDx Chiang Mai",
        period: t("Feb 2016", "2016. febr."),
        description: t("Contributed to event organization and attendee experience.", "Palīdzēju organizēt pasākumu un rūpējos par apmeklētājiem."),
        link: null
      }
    ]
  }
];

const CategoryCarousel = ({ category }: { category: ReturnType<typeof getCategories>[number] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        setCurrentIndex(0);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const itemsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(category.items.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const CategoryIcon = category.icon;
  const { t } = useLang();

  // Group items into pages
  const pages = [];
  for (let i = 0; i < category.items.length; i += itemsPerPage) {
    pages.push(category.items.slice(i, i + itemsPerPage));
  }

  return (
    <div>
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <CategoryIcon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl lg:text-2xl font-semibold text-foreground">
          {category.title}
        </h3>
      </div>

      {/* Category Slider */}
      <div className="relative">
        {/* Navigation Buttons */}
        {totalPages > 1 && (
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between items-center z-10 pointer-events-none px-2">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="pointer-events-auto bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:bg-background h-8 w-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="pointer-events-auto bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:bg-background h-8 w-8"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {pages.map((page, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0 px-2 lg:px-8">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 items-stretch">
                  {page.map((item, index) => (
                    <Card key={index} className="card-luxury border-hover h-full flex flex-col">
                      <CardContent className="p-2 lg:p-4 flex-1 flex flex-col">
                        {/* Period */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-base lg:text-lg text-muted-foreground font-medium">
                            {item.period}
                          </span>
                        </div>

                        {/* Title & Organization */}
                        <h4 className="text-xl lg:text-2xl font-semibold text-foreground mb-1">
                          {item.title}
                        </h4>
                        <p className="text-lg lg:text-xl text-primary/80 font-medium mb-3">
                          {item.organization}
                        </p>

                        {/* Description */}
                        <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed flex-grow">
                          {item.description}
                        </p>

                        {/* Link Button */}
                        {item.link && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-4 p-0 h-auto text-primary hover:bg-transparent hover:text-foreground self-start"
                            asChild
                          >
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                              {t("View", "Skatīt")} <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={t(`Go to slide ${index + 1}`, `Rādīt ${index + 1}. slaidu`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SpeakingTeaching = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { t } = useLang();

  return (
    <section id="speaking" className="py-12 lg:py-20 px-4 lg:px-6">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="heading-elegant text-3xl lg:text-display mb-3 lg:mb-4 animate-fade-in">
            {t("Speaking & Teaching", "Uzstāšanās un pasniegšana")}
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Sharing digital marketing expertise through lectures, workshops, and mentorship across universities, programs, and media platforms.",
              "Lekcijas, darbnīcas, mentorēšana un intervijas — augstskolās, mācību programmās un medijos.",
            )}
          </p>
        </div>

        {/* Category Sections */}
        <div className="space-y-10 lg:space-y-14">
          {getCategories(t).map((category) => (
            <CategoryCarousel key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakingTeaching;
