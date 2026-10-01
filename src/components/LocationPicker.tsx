import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CAMERA } from '../data/prototype';

export interface MapPin {
  lat: number;
  lng: number;
}

interface Props {
  pin: MapPin | null;
  onPinChange: (pin: MapPin) => void;
  active: boolean;
  label?: string;
  hint?: string;
}

export default function LocationPicker({
  pin,
  onPinChange,
  active,
  label = 'View location',
  hint = 'Drop a pin as close as you can to the property or camera viewpoint.',
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const onPinChangeRef = useRef(onPinChange);

  useEffect(() => {
    onPinChangeRef.current = onPinChange;
  }, [onPinChange]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const map = L.map(mapRef.current, {
      center: [pin?.lat ?? CAMERA.coordinates.lat, pin?.lng ?? CAMERA.coordinates.lng],
      zoom: 14,
      zoomControl: true,
      attributionControl: true,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(map);
    map.on('click', (e: L.LeafletMouseEvent) => {
      onPinChangeRef.current({ lat: e.latlng.lat, lng: e.latlng.lng });
    });
    mapInstanceRef.current = map;
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const node = mapRef.current;
    if (!map || !node || !active) return;
    const refresh = () => map.invalidateSize({ animate: false });
    const frame = requestAnimationFrame(refresh);
    const timeout = window.setTimeout(refresh, 300);
    const observer = new ResizeObserver(refresh);
    observer.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      observer.disconnect();
    };
  }, [active]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (markerRef.current) {
      map.removeLayer(markerRef.current);
      markerRef.current = null;
    }
    if (pin) {
      markerRef.current = L.marker([pin.lat, pin.lng], {
        icon: L.divIcon({
          className: 'nomination-pin',
          html: '<div class="pin-dot"></div>',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        }),
      }).addTo(map);
      map.panTo([pin.lat, pin.lng], { animate: false });
    }
  }, [pin]);

  return (
    <div className="location-picker">
      <div className="location-picker-heading">
        <span className="location-picker-label">{label}</span>
        <span className="field-hint">{hint}</span>
      </div>
      <div className="nomination-map-container">
        <div ref={mapRef} className="nomination-map" />
        {!pin && <p className="map-hint">Tap to place a pin</p>}
      </div>
    </div>
  );
}
