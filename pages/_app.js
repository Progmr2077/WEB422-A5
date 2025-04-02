import "@/styles/globals.css";
import 'bootswatch/dist/Flatly/bootstrap.min.css';
import { SWRConfig } from 'swr';
import Layout from '../components/Layout';
import RouteGuard from '../components/RouteGuard'; // ADD THIS IMPORT

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      {/* Wrap RouteGuard around Layout */}
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </SWRConfig>
  );
}

export default MyApp;