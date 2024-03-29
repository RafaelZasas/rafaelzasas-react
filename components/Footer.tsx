import {useState} from 'react';
import {faPhoneSquare, faEnvelope, faBug} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const navigation = {
  toolsUsed: [
    {name: 'Firebase', href: 'https://firebase.google.com/'},
    {name: 'NextJs', href: 'https://nextjs.org/'},
    {name: 'Vercel', href: 'https://vercel.com/about'},
    {name: 'Tailwind CSS', href: 'https://tailwindcss.com/'},
    {name: 'Gitkraken', href: 'https://gitkraken.com/'},
  ],
  credits: [
    {name: 'Madusha Cooray ', href: 'https://www.linkedin.com/in/madushacooray/'},
    {name: 'Jeff Delaney (Fireship)', href: 'https://fireship.io/'},
    {name: 'Font Awesome', href: 'https://fontawesome.com/'},
    {name: 'ClickUp', href: 'https://clickup.com/'},
  ],
  resources: [
    {name: 'Google Dev Community', href: 'https://developers.google.com/community/dsc'},
    {name: 'Blog', link: '/blog'},
    {name: 'Stack Overflow', href: 'https://stackoverflow.com/'},
    {name: 'Firebase Series', href: 'https://www.youtube.com/watch?v=Wy1DnHP8LqQ&t=677s'},
    {name: 'This Codebase', href: 'https://github.com/RafaelZasas/RafaelZasas-React'},
  ],
  contact: [
    {
      name: (
        <div>
          <FontAwesomeIcon icon={faEnvelope} color={'currentColor'} /> Mail
        </div>
      ),
      href: 'mailto:admin@rafaelzasas.com',
    },
    {
      name: (
        <div>
          <FontAwesomeIcon icon={faPhoneSquare} color={'currentColor'} /> Tel
        </div>
      ),
      href: 'tel:+6194311715',
    },
    {
      name: (
        <div>
          <FontAwesomeIcon icon={faBug} color={'currentColor'} /> Bug Report
        </div>
      ),
      link: '/bugs',
    },
  ],
  social: [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rafael-zasas/',
      icon(props) {
        return (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239
                     5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764
                      1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4
                       0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            />
          </svg>
        );
      },
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/rafaelzasas/',
      icon(props) {
        return (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
              clipRule="evenodd"
            />
          </svg>
        );
      },
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/rafaelzasas',
      icon(props) {
        return (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        );
      },
    },
    {
      name: 'GitHub',
      href: 'https://github.com/RafaelZasas',
      icon(props) {
        return (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        );
      },
    },
    {
      name: 'Stack Overflow',
      href: 'https://stackoverflow.com/users/10673068/rafael-zasas',
      icon(props) {
        return (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="m6.444 14.839 10.338 2.196.433-2.089-10.338-2.212z" />
            <path d="m6.215 17.571h10.566v2.127h-10.566z" />
            <path d="m7.8 9.831 9.572 4.526.887-1.944-9.577-4.538z" />
            <path d="m17.373 14.358-.001-.001-.001.001z" />
            <path d="m2 15.429v8.571h18.992v-8.571h-2.113v6.428h-14.766v-6.428z" />
            <path d="m10.453 5.063 8.109 6.873 1.346-1.65-8.109-6.873z" />
            <path d="m22 8.587-6.302-8.587-1.691 1.286 6.302 8.587z" />
          </svg>
        );
      },
    },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-blue-50 " aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        {/* Main Footer section */}

        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Footer description section */}

          <div className="space-y-8 xl:col-span-1">
            <p className="text-base text-gray-500">
              Digital portfolio of an aspiring 10X Developer. I initially built this to showcase competency and impress
              recruiters, but it has morphed into a personal playground, and way for me to showcase what I have learned.
            </p>

            {/*Social Links */}
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  className="text-gray-400 hover:text-gray-500"
                  rel="noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/*Columns for links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Tools used</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.toolsUsed.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Shout out</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.credits.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Resources</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      {item.href && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      )}
                      {item.link && (
                        <Link href={item.link} passHref>
                          <span className="cursor-pointer text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                          </span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Contact</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.contact.map((item, index) => (
                    <li key={index}>
                      {item.href && (
                        <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                          {item.name}
                        </a>
                      )}
                      {item.link && (
                        <Link href={item.link} passHref>
                          <span className="cursor-pointer text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                          </span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2022 RZ Developments, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
