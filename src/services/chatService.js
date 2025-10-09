import api from "./api"; // usa o axios configurado
// não importa useRouter aqui!

export async function createOrGetChat(otherUserId) {
  const token = localStorage.getItem("access_token");
  const res = await api.post(
    "chats/create_or_get/",
    { other_user_id: otherUserId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data; // { chat_id, participants }
}
