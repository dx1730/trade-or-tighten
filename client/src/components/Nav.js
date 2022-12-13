/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useResolvedPath, useMatch } from "react-router-dom";

const navigation = [
  { name: 'Home', to: '/', current: true },
  { name: 'Rules', to: '/rules', current: false },
  { name: 'What is this?', to: '/whatisthis', current: false}
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function CustomLink({ item }) {
  const resolvedPath = useResolvedPath(item.to)
  const current = useMatch({ path: resolvedPath.pathname })

  return (
    <Link
      to={item.to}
      className={classNames(
        current
          ? 'bg-indigo-600 text-blue-100'
          : 'text-indigo-600 hover:bg-indigo-600 hover:text-blue-100',
        'px-3 py-2 rounded-md text-sm font-medium'
      )}
      aria-current={current ? 'page' : undefined}
    >
      {item.name}
  </Link>
  )
}

export default function Nav() {
  return (
    <>
      <Disclosure as="nav" className="bg-indigo-100">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Tailwind CSS Logo"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <CustomLink item={item}/>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <span className="text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Username</span>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </>
  )
}