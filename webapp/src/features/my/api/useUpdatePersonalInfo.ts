// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAsgardeo } from "@asgardeo/react";
import { authedPatch } from "@api/http";
import { peopleServiceUrls } from "@config/apiConfig";
import type { UpdatePersonalInfoPayload } from "./types";

// PATCH /employees/{employeeId}/personal-info. On success, invalidates the
// entire me-profile query family so the parent refetches — the returned
// data becomes the new "initial" snapshot for dirty-tracking.
export function useUpdatePersonalInfo(employeeId: string | undefined) {
  const { getIdToken } = useAsgardeo();
  const qc = useQueryClient();
  return useMutation<void, Error, UpdatePersonalInfoPayload>({
    mutationFn: async (payload) => {
      if (!employeeId) throw new Error("Missing employeeId");
      const idToken = await getIdToken();
      if (!idToken) throw new Error("No id_token available from Asgardeo");
      await authedPatch<void>(
        peopleServiceUrls.employeePersonalInfo(employeeId),
        idToken,
        payload,
      );
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["me-profile"] });
    },
  });
}
