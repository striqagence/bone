import { getPayload } from "payload";
import config from "@payload-config";

/** Marque les trois pages de pôle, qui prennent le hero sur photo. */
const payload = await getPayload({ config });

for (const pole of ["expertise", "capital", "feed"] as const) {
  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: pole } },
    limit: 1,
    draft: true,
  });
  if (!docs[0]) continue;
  await payload.update({
    collection: "pages",
    id: docs[0].id,
    data: { pole, _status: "published" },
  });
  payload.logger.info(`[pôles] ${pole}`);
}

process.exit(0);
