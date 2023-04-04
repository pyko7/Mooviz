import { MobileNavbarProps } from "@/types/header";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const MobileNavbar = ({ isOpen, setIsOpen }: MobileNavbarProps) => {
  return (
    <Transition show={isOpen}>
      <Dialog aria-label="Menu" onClose={() => setIsOpen(false)}>
        <Transition.Child
          enter="ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-linear duration-700"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 overflow-hidden bg-black/[.45] backdrop-blur-sm z-50"
        />
        <Transition.Child
          enter="ease-in-out duration-500 "
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in duration-500"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          className="fixed right-0 w-60 top-0 min-h-screen bg-neutral-900 text-neutral-200 z-50"
        >
          <Transition.Child
            enter="ease-in-out duration-500 "
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="w-full h-screen p-6">
              <div className="w-full flex flex-row-reverse mb-10">
                <button
                  aria-label="Fermer menu"
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 text-secondary"
                >
                  <XMarkIcon aria-hidden="true" />
                </button>
              </div>

              <nav className="w-full">
                <ul className="w-full flex flex-col gap-y-6 items-start text-secondary font-semibold text-base">
                  <li>
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      Accueil
                    </Link>
                  </li>
                  <li>
                    <Link href="/movies" onClick={() => setIsOpen(false)}>
                      Films
                    </Link>
                  </li>
                </ul>
              </nav>
            </Dialog.Panel>
          </Transition.Child>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default MobileNavbar;
