import { Routes, Route, Outlet } from "react-router-dom";
import { PricingPlansEditor } from "./PricingPlansEditor";
import { AttributesPage } from "./pages/Attributes";
import { PricingContext } from "./types";
import { UserContextPage } from "./pages/UserContext";
import { EvaluationPage } from "./pages/EvaluationContext";
import { PlansContextProvider } from "./context/PlansContext";
import { Plan, Plans } from "./pages/Plans";

interface PricingConfigurationRoutesProps {
  pricingContext: PricingContext;
  returnTo: string;
  theme?: string;
  onSave: (pricingContext: PricingContext) => void;
}

export function PricingConfigurationRoutes({
  pricingContext,
  returnTo,
  theme,
  onSave,
}: PricingConfigurationRoutesProps) {
  /**
   * TODO: rgb, rgba and hex validation
   * Following regex detects only rgb rgb\((\d{1,3}),(\d{1,3}),(\d{1,3}\))
   * that outbounds 255
   * Examples:
   * rgb(0,0,0) Valid color pass validation
   * rgb(128,128,128) Valid color pass validation
   * rgb(255,255,255) Valid color pass validation
   * rgb(-1,-1,-1) Invalid color It does not pass validation
   * rgb(256,256,256) Invalid color Pass validtion!!!
   * rgb(999,999,999) Invalid color Pass validation!!!
   * rgb(1000,1000,1000) Invalid color Id does not pass validation
   */

  return (
    <Routes>
      <Route
        element={
          <PricingPlansEditor
            theme={theme}
            pricingContext={pricingContext}
            returnTo={returnTo}
            onSave={onSave}
          />
        }
      >
        <Route path="/" element={<h1>Pricingplans-react</h1>} />
        <Route path="attributes" element={<AttributesPage />} />
        <Route
          path="user-context"
          element={
            <UserContextPage
              title="User context"
              tableHeaders={["Name", "Type", "Actions"]}
            />
          }
        />
        <Route
          path="plans"
          element={
            <PlansContextProvider initialPlans={pricingContext.plans}>
              <Outlet />
            </PlansContextProvider>
          }
        >
          <Route index element={<Plans />} />
          <Route path=":plan" element={<Plan />}></Route>
        </Route>
        <Route path="evaluation" element={<EvaluationPage />} />
      </Route>
    </Routes>
  );
}
