import { createClient } from "../../utils/supabase/server";

const SettingsPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .single();

  console.log(profile);

  return <div className="mx-auto max-w-xl">준비중입니다.</div>;
};

export default SettingsPage;
