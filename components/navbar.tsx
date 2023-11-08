import MainNav from "./main-nav";
import StoreSwitcher from "./store-switcher";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const stores = await prismadb.store.findMany();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-6">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
      </div>
    </div>
  );
};

export default Navbar;
