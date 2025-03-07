import translationUz from "./locales/translation-uz.json";
import translationEn from "./locales/translation-en.json";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home/Home";
import "./App.css";
import { About } from "./pages/About/About";
import { CentersAndDepartments } from "./pages/CentersAndDepartments/CentersAndDepartments";
import { News } from "./pages/News/News";
import { NewsAbout } from "./pages/NewsAbout/NewsAbout";
import { useEffect, useState } from "react";
import { SearchResult } from "./pages/SearchResult/SearchResult";
import { NotFound } from "./pages/NotFound/NotFound";
import { Contact } from "./pages/Contact/Contact";
import { TradeUnion } from "./pages/TradeUnion/TradeUnion";
import { OrganizationStructure } from "./pages/OrganizationStructure/OrganizationStructure";
import { DocAdmission } from "./pages/DocAdmission";
import { Doctaurants } from "./pages/Doctaurants";
import { DocExams } from "./pages/DocExams";
import { ScientificDegree } from "./pages/ScientificDegree";
import { ScYoung } from "./pages/ScYoung";
import { Journal } from "./pages/Journal";
import ArxivlarVaHujjatlar from "./pages/ArxivlarVaHujjatlar";
import { Sources } from "./pages/Sources";
import Avtorefaratlar from "./pages/Avtorefaratlar";
import { GlobalPartners } from "./pages/GlobalPartners";
import { GlobalResearchers } from "./pages/GlobalResearchers";
import { GlobalProjects } from "./pages/GlobalProjects";
import { Seminar } from "./pages/Seminar/Seminar";
import { ScCouncil } from "./pages/ScCouncil";
import axios from "axios";
import { Requirements } from "./pages/Requirements";
import { InternationalTravels } from "./pages/InternationalTravels";
import { JournalDetail } from "./pages/Jounrnal.Detail";
import Tahririyat from "./pages/Tabs/Tahririyat";
import Talablar from "./pages/Tabs/Talablar";
import Arxiv from "./pages/Tabs/Arxiv";
import Adabiyotlar from "./pages/Adabiyotlar";
import Manbalar from "./pages/Manbalar";
import HRPanel from "./pages/HRPanel/HRPanel";
import Notices from "./pages/Notices";
import NoticesDetail from "./pages/NoticesDetail";
import EmployeesDetail from "./pages/Employees/EmployeesDetail";
import Photos from "./pages/Photos/Photos";
import Views from "./pages/Views/Views";
import Listenings from "./pages/Listenings/Listenings";
import PhotosDetail from "./pages/Photos/PhotosDetail";
import DoctaurantsDetail from "./pages/DoctaurantsDetail";
import SeminarDetail from "./pages/Seminar/SeminarDetail";

// import GeneralInfo from "./pages/GeneralInfo/GeneralInfo";
// import Employees from "./pages/Employees/Employees";
// import Research from "./pages/Research/Research";
// import PhotoVideo from "./pages/PhotoVideo/PhotoVideo";

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: translationUz },
    en: { translation: translationEn },
  },
  lng: localStorage.getItem("i18lng") || "uz",
  fallbackLng: localStorage.getItem("i18lng") || "uz",
});

axios.defaults.baseURL = "http://backend.fati.uz";
const App = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.classList.add("true");
    setTimeout(() => {
      document.body.classList.remove("true");
    }, 500);
  }, [pathname]);

  useEffect(() => {
    document.title =
      localStorage.getItem("i18lng") == "uz"
        ? "O'zbekiston fanlar akademiyasi Tarix instituti"
        : "Institute of History of the Academy of Sciences of Uzbekistan";
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} />}>
        <Route
          index
          element={<Home setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="about"
          element={<About setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="HRPanel"
          element={<HRPanel setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="journal"
          element={<Journal setLoading={setLoading} loading={loading} />}
        >
          <Route index element={<Navigate to="tahririyat" replace />} />
          <Route path="tahririyat" element={<Tahririyat />} />
          <Route path="talablar" element={<Talablar />} />
          <Route path="arxiv" element={<Arxiv />} />
        </Route>

        <Route
          path="centers-and-departments/:type/:id"
          element={
            <CentersAndDepartments setLoading={setLoading} loading={loading} />
          }
        />

        <Route
          path="centers-and-departments/:detail"
          element={<EmployeesDetail />}
        />

        <Route
          path="news"
          element={<News setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="news/:id"
          element={<NewsAbout setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="international-travels"
          element={
            <InternationalTravels setLoading={setLoading} loading={loading} />
          }
        />

        <Route
          path="search/:value"
          element={<SearchResult setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="seminar/:id"
          element={<Seminar setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="seminar/:id/:seminarDetail"
          element={<SeminarDetail setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="contact"
          element={<Contact setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="trade-union"
          element={<TradeUnion setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="organization-structure"
          element={
            <OrganizationStructure setLoading={setLoading} loading={loading} />
          }
        />

        <Route
          path="doc-admission"
          element={<DocAdmission setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="doctaurants"
          element={<Doctaurants setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="doctaurants/:id"
          element={
            <DoctaurantsDetail setLoading={setLoading} loading={loading} />
          }
        />

        <Route
          path="doc-exams"
          element={<DocExams setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="scientific-degree"
          element={
            <ScientificDegree setLoading={setLoading} loading={loading} />
          }
        />

        <Route
          path="notices"
          element={<Notices setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="notices/:id"
          element={<NoticesDetail setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="sc-young"
          element={<ScYoung setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="sc-council"
          element={<ScCouncil setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="requirements"
          element={<Requirements setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="adabiyotlar/:adabiyotlarId"
          element={<Adabiyotlar setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="manbalar/:manbalarId"
          element={<Manbalar setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="arxivlarVaHujjatlar/:arxivlarVaHujjatlarId"
          element={
            <ArxivlarVaHujjatlar setLoading={setLoading} loading={loading} />
          }
        />

        <Route
          path="avtorefaratlar/:avtorefaratlarId"
          element={<Avtorefaratlar setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="sources"
          element={<Sources setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="global-partners"
          element={<GlobalPartners setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="global-researchers"
          element={
            <GlobalResearchers setLoading={setLoading} loading={loading} />
          }
        />

        <Route
          path="global-projects"
          element={<GlobalProjects setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="photos"
          element={<Photos setLoading={setLoading} loading={loading} />}
        />

        <Route
          path="photos/:id"
          element={<PhotosDetail setLoading={setLoading} loading={loading} />}
        />

        <Route path="views" element={<Views setLoading={setLoading} />} />

        <Route
          path="listenings"
          element={<Listenings setLoading={setLoading} loading={loading} />}
        />

        <Route path="/journal/detail/:id" element={<JournalDetail />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
