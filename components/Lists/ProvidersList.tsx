import { providersList } from "@/utils/providersList";
import ProviderCard from "@/components/Cards/ProviderCard";
import HorizontalScrollingList from "./HorizontalScrollingList";
import { ListType } from "@/types/components";

const ProvidersList = () => {
  return (
    <HorizontalScrollingList scroll={650} type={ListType.Image}>
      <ul className="w-full flex gap-x-5 " role="list">
        {providersList?.map((provider) => (
          <li className="pt-6 pb-10" role="listitem" key={provider.id}>
            <ProviderCard {...provider} />
          </li>
        ))}
      </ul>
    </HorizontalScrollingList>
  );
};

export default ProvidersList;
