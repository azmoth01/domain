export default async function handler(req, res) {
  const { character_name } = req.query;

  if (!character_name) {
    return res.status(400).json({
      error: { name: "BadRequest", message: "캐릭터 이름을 입력해주세요." }
    });
  }

  try {
    const response = await fetch(
      `https://open.api.nexon.com/maplestory/v1/id?character_name=${encodeURIComponent(character_name)}`,
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
      error: { name: "ServerError", message: "서버 통신 중 오류가 발생했습니다." }
    });
  }
}
