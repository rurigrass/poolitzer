import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
        <div className="fixed bottom-8 left-2 right-2 md:left-auto md:right-8 md:max-w-xl p-6 rounded-2xl border border-glass bg-glass glass z-50">
          <h2 className="text-xl font-semibold">Liquid Glass Card</h2>
          <p className="mt-2">
            This card uses transparency, blur, and soft borders to create a
            glassmorphism effect.
          </p>
          <button className="mt-4 px-4 py-2 rounded-lg bg-glass-200 hover:bg-glass-300">
            Explore
          </button>
        </div>
        <iframe
          src="https://codesandbox.io/embed/4qqvrz?view=editor+%2B+preview&module=%2Findex.html"
          // style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
          title="Basic Liquid glass"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
      </main>
    </>
  );
}
