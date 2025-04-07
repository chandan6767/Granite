// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import { initializeLogger } from "common/logger";
import "../stylesheets/application.scss";
import "./controllers";

import { setAuthHeaders } from "apis/axios";

initializeLogger();
setAuthHeaders();
