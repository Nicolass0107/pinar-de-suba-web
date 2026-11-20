import type { IBackendClient } from "../ports/IBackendClient.js";

export class NeighborhoodService {
  constructor(private readonly backend: IBackendClient) {}

  getInfo() {
    return this.backend.getNeighborhoodInfo();
  }
}
