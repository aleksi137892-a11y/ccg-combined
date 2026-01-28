import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";

type WorldTopology = {
  type: "Topology";
  objects: {
    countries: {
      type: "GeometryCollection";
      geometries: Array<{
        type: string;
        arcs: unknown;
        id?: string;
        properties?: {
          name?: string;
        };
      }>;
    };
  };
};

type WorldFeatureCollection = {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    id?: string | number;
    properties?: {
      name?: string;
    };
    geometry: {
      type: string;
      coordinates: unknown;
    };
  }>;
};

export const buildWorldMap = (
  topology: WorldTopology,
  width: number,
  height: number
) => {
  const collection = feature(
    topology,
    topology.objects.countries
  ) as WorldFeatureCollection;
  const projection = geoNaturalEarth1().fitSize([width, height], collection);
  const path = geoPath(projection);

  return { features: collection.features, path };
};
