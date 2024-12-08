import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api";

export const getAllCharacters = async () => {
  const data = [];
  try {
    for (let i = 1; i < 43; i++) {
      //42 Tane sayfa olduğu için for döngüsüyle her sayfadaki veriyi alındı.
      const response = await axios.get(`${API_URL}/character/?page=${i}`);
      data.push(...response.data.results);
    }
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getCharacterDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/character/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const filteredCharacter = async (query) => {
  const filteredData = [];
  let nextUrl = `${API_URL}/character/?${query}`;

  try {
    while (nextUrl) {
      // Bir sonraki URLden veriyi almak için GET isteği yapıldı
      const response = await axios.get(nextUrl);

      // Eğer yanıt başarılıysa ve sonuçlar varsa bu veriyi filtrelenmiş veriler eklendi
      if (response.status === 200 && response.data.results?.length > 0) {
        filteredData.push(...response.data.results);

        // Eğer bir sonraki sayfaya ait veri varsa  nextUrl değişkenine yeni URL atandı
        nextUrl = response.data.info.next;
      } else {
        console.log("No more data:", response);
        break;
      }
    }
    return filteredData;
  } catch (e) {
    console.log("Error fetching character data:", e.message);
    return [];
  }
};
