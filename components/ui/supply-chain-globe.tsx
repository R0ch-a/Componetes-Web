"use client";

import { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { cn } from "@/lib/utils";

export interface SupplyChainFlow {
  /** Código ISO de duas letras da origem. */
  sourceId: string;
  /** Código ISO de duas letras do destino. */
  targetId: string;
  value: number;
}

export interface SupplyChainGlobeProps {
  /** Ligações do Sankey, na ordem origem > destino. */
  flows: SupplyChainFlow[];
  /** Nome legível de cada código ISO, usado nos tooltips. */
  countryNames?: Record<string, string>;
  /** Países pintados como produtores (verde). */
  producerIds?: string[];
  /** Países pintados como entrepostos (âmbar). */
  hubIds?: string[];
  /** Países pintados como mercados consumidores (areia). */
  consumerIds?: string[];
  title?: string;
  subtitle?: string;
  /** Unidade mostrada nos tooltips, depois do valor. */
  unit?: string;
  /** Gira o globo sozinho até a primeira interação. */
  autoRotate?: boolean;
  /** Duração de uma volta completa, em ms. */
  rotationDuration?: number;
  className?: string;
}

/** Paleta café do original. */
const ESPRESSO = 0x3c1e0e;
const DARK_ROAST = 0x5c3a1e;
const MEDIUM_ROAST = 0x8b5e3c;
const LIGHT_ROAST = 0xc4956a;
const CREMA = 0xe8d5b7;
const CREAM = 0xf5ece0;

/** Grão de café desenhado à mão, usado como bullet que corre pelas rotas. */
const COFFEE_BEAN_PATH =
  "M-4,-2.5 C-4,-5 -1.5,-6.5 1,-6.5 C3.5,-6.5 5,-4.5 5,-2 C5,1 3,3.5 0.5,5 C-0.5,5.7 -1.5,5.7 -2.5,5 C-5,3.5 -6,1 -4,-2.5 Z M-1,-5 C-1,-1 -1,2 -0.5,4.5";

export function SupplyChainGlobe({
  flows,
  countryNames = {},
  producerIds = [],
  hubIds = [],
  consumerIds = [],
  title,
  subtitle,
  unit = "k tonnes",
  autoRotate = true,
  rotationDuration = 120000,
  className,
}: SupplyChainGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const root = am5.Root.new(node);

    const coffeeTheme = am5.Theme.new(root);
    coffeeTheme.rule("InterfaceColors").setAll({
      primaryButton: am5.color(MEDIUM_ROAST),
      primaryButtonHover: am5.color(DARK_ROAST),
      primaryButtonDown: am5.color(ESPRESSO),
      primaryButtonActive: am5.color(LIGHT_ROAST),
      primaryButtonText: am5.color(CREAM),
      secondaryButton: am5.color(CREMA),
      secondaryButtonHover: am5.color(0xd4c4a8),
      secondaryButtonDown: am5.color(LIGHT_ROAST),
      secondaryButtonText: am5.color(ESPRESSO),
      background: am5.color(CREMA),
      text: am5.color(ESPRESSO),
    });
    root.setThemes([am5themes_Animated.new(root), coffeeTheme]);

    // Fundo de papel granulado.
    root.container.set(
      "background",
      am5.Rectangle.new(root, {
        fill: am5.color(0xf0e6d6),
        fillPattern: am5.GrainPattern.new(root, {
          density: 0.4,
          maxOpacity: 0.07,
          colors: [am5.color(0x000000)],
        }),
      }),
    );

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        rotationX: -15,
        rotationY: -20,
        minZoomLevel: 0.5,
        zoomLevel: 0.9,
      }),
    );

    // Disco do globo, atrás dos países.
    const bgSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    bgSeries.mapPolygons.template.setAll({
      fill: am5.color(0xede4d4),
      fillOpacity: 1,
      strokeOpacity: 0,
    });
    bgSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    const graticuleSeries = chart.series.push(
      am5map.GraticuleSeries.new(root, {}),
    );
    graticuleSeries.mapLines.template.setAll({
      stroke: am5.color(MEDIUM_ROAST),
      strokeOpacity: 0.15,
      strokeWidth: 0.5,
    });

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, { geoJSON: am5geodata_worldLow }),
    );
    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(CREAM),
      stroke: am5.color(LIGHT_ROAST),
      strokeWidth: 0.5,
      strokeOpacity: 0.5,
    });

    polygonSeries.events.on("datavalidated", () => {
      polygonSeries.dataItems.forEach((di) => {
        const id = di.get("id");
        if (!id) return;
        const polygon = di.get("mapPolygon");
        if (!polygon) return;
        if (producerIds.includes(id)) {
          polygon.setAll({ fill: am5.color(0x8fae7e) });
        } else if (hubIds.includes(id)) {
          polygon.setAll({ fill: am5.color(0xc4a878) });
        } else if (consumerIds.includes(id)) {
          polygon.setAll({ fill: am5.color(0xddc8a0) });
        }
      });
    });

    const sankeySeries = chart.series.push(
      am5map.MapSankeySeries.new(root, {
        polygonSeries: polygonSeries,
        maxWidth: 2,
        controlPointDistance: 0.4,
        resolution: 60,
        nodePadding: 0.3,
      }),
    );

    sankeySeries.mapPolygons.template.setAll({
      fill: am5.color(MEDIUM_ROAST),
      fillOpacity: 0.65,
      strokeOpacity: 0,
      tooltipText: `{sourceNode.name} > {targetNode.name}\n{value}${unit}`,
    });

    sankeySeries.nodes.mapPolygons.template.setAll({
      fill: am5.color(ESPRESSO),
      stroke: am5.color(CREMA),
      strokeWidth: 1.5,
      fillOpacity: 0.95,
      strokeOpacity: 1,
      tooltipText: `{name}\n{sum}${unit}`,
    });

    // Grãos de café que percorrem cada rota.
    sankeySeries.bullets.push(() =>
      am5.Bullet.new(root, {
        locationX: 0,
        autoRotate: true,
        sprite: am5.Graphics.new(root, {
          svgPath: COFFEE_BEAN_PATH,
          fill: am5.color(ESPRESSO),
          stroke: am5.color(DARK_ROAST),
          strokeWidth: 0.5,
          centerX: am5.p50,
          centerY: am5.p50,
          scale: 0.35,
          visible: false,
        }),
      }),
    );

    sankeySeries.data.setAll(flows);

    const timers: ReturnType<typeof setTimeout>[] = [];

    sankeySeries.events.on("datavalidated", () => {
      sankeySeries.nodes.dataItems.forEach((di) => {
        const id = di.get("id");
        if (id && countryNames[id]) di.set("name", countryNames[id]);
      });

      // Cada grão parte com atraso e duração próprios, para não andarem em fila.
      sankeySeries.dataItems.forEach((dataItem) => {
        const bullets = dataItem.bullets;
        if (!bullets) return;
        bullets.forEach((bullet) => {
          const randomDur = 3000 + Math.random() * 3000;
          const delay = Math.random() * randomDur;
          timers.push(
            setTimeout(() => {
              const sprite = bullet.get("sprite");
              if (sprite) sprite.set("visible", true);
              bullet.animate({
                key: "locationX",
                from: 0,
                to: 1,
                duration: randomDur,
                easing: am5.ease.linear,
                loops: Infinity,
              });
            }, delay),
          );
        });
      });
    });

    if (title || subtitle) {
      const titleCont = chart.children.push(
        am5.Container.new(root, {
          layout: root.verticalLayout,
          x: am5.p50,
          centerX: am5.p50,
          y: am5.p100,
          centerY: am5.p100,
          position: "absolute",
          paddingBottom: 16,
        }),
      );

      if (title) {
        titleCont.children.push(
          am5.Label.new(root, {
            text: title,
            fontSize: 18,
            fontWeight: "600",
            fill: am5.color(ESPRESSO),
            x: am5.p50,
            centerX: am5.p50,
          }),
        );
      }

      if (subtitle) {
        titleCont.children.push(
          am5.Label.new(root, {
            text: subtitle,
            fontSize: 11,
            fill: am5.color(MEDIUM_ROAST),
            x: am5.p50,
            centerX: am5.p50,
          }),
        );
      }
    }

    // Alternador globo / mapa plano.
    const switchCont = chart.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 20,
        y: 40,
      }),
    );

    switchCont.children.push(
      am5.Label.new(root, {
        centerY: am5.p50,
        text: "Globe",
        fill: am5.color(ESPRESSO),
        fontSize: 13,
      }),
    );

    const switchButton = switchCont.children.push(
      am5.Button.new(root, {
        themeTags: ["switch"],
        centerY: am5.p50,
        icon: am5.Circle.new(root, { themeTags: ["icon"] }),
      }),
    );

    switchCont.children.push(
      am5.Label.new(root, {
        centerY: am5.p50,
        text: "Map",
        fill: am5.color(ESPRESSO),
        fontSize: 13,
      }),
    );

    const easing = am5.ease.inOut(am5.ease.cubic);
    const duration = 1500;
    const fadeDuration = 300;

    const zoomToGlobe = () => {
      chart.set("projection", am5map.geoOrthographic());
      chart.set("panX", "rotateX");
      chart.set("panY", "rotateY");
      chart.animate({ key: "rotationX", to: -15, duration, easing });
      chart.animate({ key: "rotationY", to: -20, duration, easing });
      bgSeries.mapPolygons.template.set("fillOpacity", 1);
      chart.set("minZoomLevel", 0.9);
      chart.animate({ key: "zoomLevel", to: 0.9, duration, easing });
    };

    const zoomToMap = () => {
      chart.set("projection", am5map.geoMercator());
      chart.set("panX", "translateX");
      chart.set("panY", "translateY");
      chart.animate({ key: "rotationX", to: 0, duration, easing });
      chart.animate({ key: "rotationY", to: 0, duration, easing });
      bgSeries.mapPolygons.template.set("fillOpacity", 0);
      chart.set("minZoomLevel", 1);
      chart.animate({ key: "zoomLevel", to: 1.7, duration, easing });
    };

    switchButton.on("active", () => {
      chart.goHome(duration);
      // Some antes de trocar a projeção e reaparece depois.
      timers.push(
        setTimeout(() => {
          chart.seriesContainer.animate({
            key: "opacity",
            to: 0,
            duration: fadeDuration,
          });
        }, duration - fadeDuration),
      );
      timers.push(
        setTimeout(() => {
          if (switchButton.get("active")) zoomToMap();
          else zoomToGlobe();
          chart.seriesContainer.animate({
            key: "opacity",
            to: 1,
            duration: fadeDuration,
          });
        }, duration),
      );
    });

    const zoomControl = chart.set(
      "zoomControl",
      am5map.ZoomControl.new(root, {}),
    );
    zoomControl.homeButton.set("visible", true);

    if (autoRotate) {
      let rotationAnimation: ReturnType<typeof chart.animate> | null =
        chart.animate({
          key: "rotationX",
          from: -15,
          to: -15 + 360,
          duration: rotationDuration,
          loops: Infinity,
          easing: am5.ease.linear,
        });

      chart.chartContainer.events.on("pointerdown", () => {
        if (rotationAnimation) {
          rotationAnimation.stop();
          rotationAnimation = null;
        }
      });
    }

    chart.appear(1000, 100);

    return () => {
      timers.forEach(clearTimeout);
      root.dispose();
    };
  }, [
    flows,
    countryNames,
    producerIds,
    hubIds,
    consumerIds,
    title,
    subtitle,
    unit,
    autoRotate,
    rotationDuration,
  ]);

  return <div ref={containerRef} className={cn("h-full w-full", className)} />;
}
