import * as Sentry from '@sentry/react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.scss'

Sentry.init({
	dsn: 'https://05cdfb3bbdd6ff06ecca22d8ed87b866@o4506971623522304.ingest.us.sentry.io/4506971658059776',
	integrations: [
		Sentry.browserTracingIntegration(),
    Sentry.metrics.metricsAggregatorIntegration(),
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
    }),
		Sentry.replayIntegration({
			maskAllText: false,
			blockAllMedia: false
		})
	],
	tracesSampleRate: 1.0,
	tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
