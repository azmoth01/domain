export default async function handler(req, res) {
  const { ocid } = req.query;

  if (!ocid) {
    return res.status(400).json({
      error: { name: "BadRequest", message: "OCID가 필요합니다." }
    });
  }

  try {
    const response = await fetch(
      `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`,
      {
        headers: {
          "x-nxopen-api-key": process.env.NEXON_API_KEY
        }
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);

  } catch {
    res.status(500).json({
      error: { name: "ServerError", message: "캐릭터 정보를 불러오지 못했습니다." }
    });
  }
}
