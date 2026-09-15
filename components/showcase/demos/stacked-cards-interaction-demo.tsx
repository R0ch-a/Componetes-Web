import { StackedCardsInteraction } from "@/components/ui/stacked-cards-interaction";

const StackedCardsInteractionDemo = () => {
  return (
    <StackedCardsInteraction
      cards={[
        {
          image:
            "https://cdn.21st.dev/assets/mirror/19/1991f46523d08e01b25feb3bd63dd633b6615aa1633c390d330d23ed5d4e151b.jpg",
          title: "Card 1",
          description: "This is the first card",
        },
        {
          image:
            "https://cdn.21st.dev/assets/mirror/47/4787cedc2d76c785a9dff04702b115561a9aedab29788f8ee5c331aba294013d.jpg",
          title: "Card 2",
          description: "This is the second card",
        },
        {
          image:
            "https://cdn.21st.dev/assets/mirror/e0/e069490e98dcec696dec62acb183ea27181575cc47857611011bcfc0004ee881.jpg",
          title: "Card 3",
          description: "This is the third card",
        },
      ]}
    />
  );
};

export { StackedCardsInteractionDemo };
