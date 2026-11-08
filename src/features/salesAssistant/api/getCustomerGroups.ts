import "server-only";
import { httpApiRoot } from "@/graphQl/client/admin/client";

export async function getCustomerGroups(userId: string) {
  const user = await httpApiRoot
    .customers()
    .withId({ ID: userId })
    .get({
      queryArgs: {
        expand: ["customerGroup", "customerGroupAssignments[*].customerGroup"],
      },
    })
    .execute();

  return user;
}
