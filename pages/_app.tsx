import '../styles/globals.css';
import type { AppProps } from 'next/app';
import SavedGameStateProvider from '../providers/SavedGameStateProvider';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SavedGameStateProvider>
            <Component {...pageProps} />
        </SavedGameStateProvider>
    );
}

export default MyApp;
