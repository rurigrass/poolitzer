import { SnapScrollBoxes } from "@/components/SnapScrollBoxes";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col gap-6">
      <div className="px-4">
        <h2 className="font-medium text-xl">Next steps</h2>
        <div className="fixed bottom-8 left-2 right-2 md:left-auto md:right-8 md:max-w-xl p-6 rounded-2xl border border-glass bg-glass glass z-50">
          <h3 className="text-xl font-semibold">Liquid Glass Card</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            This card uses transparency, blur, and soft borders to create a
            glassmorphism effect.
          </p>
          <button className="mt-4 px-4 py-2 rounded-lg bg-glass-200 hover:bg-glass-300 transition-colors">
            Explore
          </button>
        </div>
      </div>

      <SnapScrollBoxes count={11} />

      {/* <iframe
        className="aspect-video w-full rounded-xl border border-border"
        src="https://codesandbox.io/embed/4qqvrz?view=editor+%2B+preview&module=%2Findex.html"
        title="Basic liquid glass demo"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      /> */}
    </main>
  );
}
