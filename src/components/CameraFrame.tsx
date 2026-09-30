export default function CameraFrame({ business = false }: { business?: boolean }) {
return <section className="camera-frame" aria-label={business ? 'Concept Pacific Beach camera; no live video is connected' : 'Concept Windansea camera; no live video is connected'}>
<div className="camera-top"><span className="live"><i aria-hidden="true" /> LIVE</span><span>{business ? 'CAM 002' : 'CAM 001'}</span></div>
<div className="camera-place"><strong>{business ? 'PACIFIC BEACH' : 'WINDANSEA'}</strong><span>{business ? 'SAN DIEGO, CA' : 'LA JOLLA, CA'}</span></div>
<span className="camera-concept">CONCEPT CAMERA</span></section>;
}
