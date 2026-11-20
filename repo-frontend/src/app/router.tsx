import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { NeighborhoodPage } from "../features/neighborhood/NeighborhoodPage";
import { NewsListPage } from "../features/news/NewsListPage";
import { NewsDetailPage } from "../features/news/NewsDetailPage";
import { NewsCreatePage } from "../features/news/NewsCreatePage";
import { PoiPage } from "../features/poi/PoiPage";
import { ReportFormPage } from "../features/reports/ReportFormPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <NeighborhoodPage /> },
        { path: "noticias", element: <NewsListPage /> },
        { path: "noticias/nueva", element: <NewsCreatePage /> },
        { path: "noticias/:id", element: <NewsDetailPage /> },
        { path: "puntos", element: <PoiPage /> },
        { path: "reportes", element: <ReportFormPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
