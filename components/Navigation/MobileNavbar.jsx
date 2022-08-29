import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import ThemeModal from '../ThemeModal';

const MobileNavbar = ({ isOpen, setIsOpen }) => {

    return (
        // Use the `Transition` component at the root level
        <Transition show={isOpen} >
            <Dialog onClose={() => setIsOpen(false)}>
                {/* background opacity transition */}
                <Transition.Child
                    enter="ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-linear duration-700"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="block fixed inset-0 overflow-hidden bg-black/[.25] backdrop-blur-sm z-50"
                />
                <Transition.Child
                    enter="ease-in-out duration-500 "
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="ease-in duration-500"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                    className='block fixed  right-0 w-60 top-0 min-h-screen bg-white dark:bg-neutral-800 dark:text-white z-50'
                >
                    <Transition.Child
                        enter="ease-in-out duration-500 "
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-1000"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Panel className='w-full h-screen' >
                            {/* nav list translate animation */}
                            <div className='w-full p-5 mb-16 flex justify-end'>
                                <XIcon tabIndex="0" className='w-9 h-9 text-secondary' aria-label="Close navigation modal" onClick={() => setIsOpen(false)} />
                            </div>

                            <nav className='w-full px-3'>
                                <ul className='w-full flex flex-col gap-y-6 items-start text-secondary font-semibold text-base'>
                                    <Link href="/">
                                        <a onClick={() => setIsOpen(false)}>
                                            <li>Home</li>
                                        </a>
                                    </Link>
                                    <Link href="/movies">
                                        <a onClick={() => setIsOpen(false)}>
                                            <li>Movies</li>
                                        </a>
                                    </Link>

                                    <li>Series <em>(Soon available)</em></li>

                                </ul>
                                <div className=' mt-16 flex items-center gap-x-4 text-secondary font-semibold text-base  '>
                                    <p>Switch theme :</p>
                                    <ThemeModal />
                                </div>

                            </nav>
                        </Dialog.Panel>
                    </Transition.Child>
                </Transition.Child>
            </Dialog >
        </Transition >
    )

}

export default MobileNavbar;