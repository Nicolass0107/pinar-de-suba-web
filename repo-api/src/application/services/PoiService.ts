import type { CreatePoiInput } from "../../contracts/poi.schema.js";
import type { IBackendClient } from "../ports/IBackendClient.js";

export class PoiService {
  constructor(private readonly backend: IBackendClient) {}

  list() { return this.backend.listPois(); }
  create(input: CreatePoiInput) { return this.backend.createPoi(input); }
}
