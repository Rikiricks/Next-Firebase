import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
    <Component {...pageProps}></Component>

    </Layout>
  )
}
export default MyApp
