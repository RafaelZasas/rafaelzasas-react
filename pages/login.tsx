import {appleAuthProvider, githubAuthProvider, auth, googleAuthProvider} from '../lib/firebase';
import {useRouter} from 'next/router';
import {useContext, useEffect, useState} from 'react';
import ConfirmSignUpModal from '../components/confirmSignUpMoodal';
import Metatags from '../components/Metatags';
import {FirebaseContext} from '../lib/FirebaseTrackingProvider';
import {logEvent} from 'firebase/analytics';
import {signInWithPopup} from '@firebase/auth';
import {getUser, updateUser} from '../lib/FirestoreOperations';
import {createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword} from 'firebase/auth';
import {GetImage} from '../lib/CloudStorageOperations';
import {ToastContext} from '../lib/context';

function validateEmail(email) {
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email);
}

function validatePassword(password) {
  const regexp = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,50}$/;
  return regexp.test(password);
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openConfirmSignUpModal, setOpenConfirmSignUpModal] = useState(false);
  const [createNewUser, setCreateNewUser] = useState(false);
  const analytics = useContext(FirebaseContext);
  const {setShowToast, setToastData} = useContext(ToastContext);

  useEffect(() => {
    const SignUp = async () => {
      try {
        const token = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(token.user);
        // display success toast
        setToastData({
          heading: 'Account Created!!',
          body: `Please verify your account by clicking the link that was sent to ${email}`,
          type: 'success',
        });
        setShowToast(true);
        (await ValidateNewUser(token, analytics)) ? await router.push('/profile') : await router.push('/');
      } catch (e) {
        console.log(e);
        setToastData({
          heading: 'Error Creating Account',
          body: e.message,
          type: 'error',
        });
        setShowToast(true);
      }
    };

    createNewUser ? SignUp() : null;
  }, [createNewUser]);

  const loginWithEmail = async (e) => {
    e.preventDefault();

    try {
      // Some error handling to make sure users dont pull a fast one
      if (!validateEmail(e.target.email.value)) {
        throw new Error(`Please enter a valid Email`);
      } else if (e.target.password.value.length < 6) {
        throw new Error('Password must be at least 6 characters');
      } else if (!validatePassword(e.target.password.value)) {
        throw new Error('Password must contain at least one letter and number');
      }

      try {
        const token = await signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value);
        (await ValidateNewUser(token, analytics)) ? await router.push('/profile') : await router.push('/');
      } catch (e) {
        console.log(e);
        const error = () => {
          setToastData({
            type: 'error',
            heading: 'Authentication Error',
            body: e.message,
          });
          setShowToast(true);
        };
        e.code === 'auth/user-not-found' ? setOpenConfirmSignUpModal(true) : error();
      }

      // end success of mail delivery
    } catch (e) {
      console.log(e);
      setToastData({
        heading: 'Whoops',
        body: e.message,
        type: 'error',
      });
      setShowToast(true);
    }
  };
  return (
    <main>
      <Metatags
        title="Login"
        description="Login or Sign Up for my awesome website"
        currentURL="rafaelzasas.com/login"
      />
      <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <ConfirmSignUpModal
          open={openConfirmSignUpModal}
          setOpen={setOpenConfirmSignUpModal}
          details={{email: email, password: password}}
          setCreateNewUser={setCreateNewUser}
        />
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <h6 className="mt-2 text-center text-sm text-slate-500">
            Or create an account by entering your desired credentials
          </h6>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST" onSubmit={loginWithEmail}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => {
                      setPassword(e.currentTarget.value);
                    }}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <SignInWithGoogleButton />
                <SignInWithGitHubButton />
                <SignInWithAppleButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function SignInWithGoogleButton() {
  const router = useRouter();
  const analytics = useContext(FirebaseContext);

  const signInWithApple = async () => {
    const token = await signInWithPopup(auth, googleAuthProvider);
    // const token = await auth.signInWithPopup(googleAuthProvider);
    (await ValidateNewUser(token, analytics)) ? await router.push('/profile') : router.back();
  };

  return (
    <div>
      <button
        onClick={signInWithApple}
        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
      >
        <span className="sr-only">Sign in with Google</span>
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
            <path
              fill="#4285F4"
              d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
            />
            <path
              fill="#34A853"
              d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
            />
            <path
              fill="#FBBC05"
              d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
            />
            <path
              fill="#EA4335"
              d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
            />
          </g>
        </svg>
      </button>
    </div>
  );
}

function SignInWithGitHubButton() {
  const router = useRouter();
  const analytics = useContext(FirebaseContext);

  const signInWithGitHub = async () => {
    const token = await signInWithPopup(auth, githubAuthProvider);
    console.dir(token);
    (await ValidateNewUser(token, analytics)) ? await router.push('/profile') : await router.push('/');
  };

  return (
    <div>
      <button
        onClick={signInWithGitHub}
        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
      >
        <span className="sr-only">Sign in with GitHub</span>
        <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

function SignInWithAppleButton() {
  const router = useRouter();
  const analytics = useContext(FirebaseContext);

  const signInWithApple = async () => {
    const token = await signInWithPopup(auth, appleAuthProvider);
    (await ValidateNewUser(token, analytics)) ? await router.push('/profile') : await router.push('/');
  };

  return (
    <div>
      <button
        onClick={signInWithApple}
        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
      >
        <span className="sr-only">Sign in with Apple</span>
        <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 842 1e3" width="842" height="1e3">
          <path d="M702 960c-54.2 52.6-114 44.4-171 19.6-60.6-25.3-116-26.9-180 0-79.7 34.4-122 24.4-170-19.6-271-279-231-704 77-720 74.7 4 127 41.3 171 44.4 65.4-13.3 128-51.4 198-46.4 84.1 6.8 147 40 189 99.7-173 104-132 332 26.9 396-31.8 83.5-72.6 166-141 227zM423 237C414.9 113 515.4 11 631 1c15.9 143-130 250-208 236z" />
        </svg>
      </button>
    </div>
  );
}

/**
 * Adds default user data into firestore if user is signing in for the first time
 * @param token Firebase token provided on completion of sign in
 */
async function ValidateNewUser(token, analytics) {
  const userData = await getUser(token.user.uid);

  if (!userData || !userData.email) {
    const data = {
      uid: token.user.uid,
      email: token.user.email,
      profilePhoto: token.user.photoURL || (await GetImage('profilePhotos/default-avatar.jpg')),
      username: token.user.displayName || token.user.email.split('@')[0],
      permissions: {
        level: 0,
        admin: false,
      },
      communications: {
        email: {comments: false, projects: false, updates: false},
        push: {comments: false, projects: false, updates: false},
      },
    };
    await updateUser(data.uid, data);
    logEvent(analytics, 'sign_up', {
      uid: data.uid,
      email: data.email,
    });
    return true;
  } else {
    logEvent(analytics, 'login', {
      uid: userData?.uid,
      email: userData?.email,
    });
    return false;
  }
}
