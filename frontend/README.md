# Frontend - Credit Card Fraud Detection

Modern React web application for demonstrating ML-powered fraud detection.

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Icons:** Lucide React

## Features

### Pages

1. **Home** - Landing page with problem explanation and CTA
2. **About** - Dataset details and project challenges
3. **Model** - ML pipeline, metrics, and model comparison
4. **Live Detection** - Interactive fraud detection interface
5. **Dashboard** - Visual analytics and insights

### Key Components

- Responsive navigation with mobile menu
- Dark mode support (via Tailwind)
- Loading states and error handling
- Interactive charts and visualizations
- Sample transaction loader
- Real-time API integration

## Setup & Installation

### Prerequisites

- Node.js 18+ and npm

### Installation Steps

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Start development server:**
```bash
npm run dev
```

Server runs on `http://localhost:5173`

3. **Build for production:**
```bash
npm run build
```

Build output in `dist/` folder.

4. **Preview production build:**
```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Model.jsx
│   │   ├── LiveDetection.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx         # Main app with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## API Integration

The frontend connects to FastAPI backend at `http://localhost:8000`

### Endpoints Used

- `POST /predict` - Get fraud prediction
- `GET /model-info` - Fetch model metrics
- `GET /feature-importance` - Get top features
- `GET /statistics` - Get dataset stats

Update `API_URL` in page files if backend runs on different port.

## Customization

### Colors

Edit `tailwind.config.js` to customize color scheme:

```js
colors: {
  primary: { ... },
  danger: { ... },
  success: { ... }
}
```

### API URL

Update API URL in pages:
- `LiveDetection.jsx`
- `Model.jsx`
- `Dashboard.jsx`

## Deployment

### Vercel/Netlify

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable for API URL

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to hosting service
```

## Development Tips

- Hot reload enabled by default
- Use React DevTools for debugging
- Check browser console for API errors
- Tailwind classes are purged in production

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance

- Code splitting by route
- Lazy loading for charts
- Optimized bundle size (~200KB gzipped)
- Fast initial load (<1s)
