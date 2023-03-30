import { providersList } from "@/utils/providersList";
import ProviderCard from "@/components/Cards/ProviderCard";
import HorizontalScrollingList from "./HorizontalScrollingList";
import { ListType } from "@/types/components";

const ProvidersList = () => {
  return (
    <HorizontalScrollingList scroll={650} type={ListType.Image}>
      {providersList?.map((provider) => (
        <li className="pt-6 pb-10" key={provider.id}>
          <ProviderCard {...provider} />
        </li>
      ))}
    </HorizontalScrollingList>
  );
};

export default ProvidersList;
