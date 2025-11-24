import { useState, useEffect } from 'react';
import './NasaSection.css';

const API_KEY = 'mEKZWwS5LqebTLEuq1DunieYsVcFXYcgUGEF008n';

const NasaSection = ({
    enableDatePicker = true,
    initialDate = '',
    displayMode = 'full', // 'hero' | 'full'
    className = '',
    customTitle = null
}) => {
    const [photoData, setPhotoData] = useState(null);
    const [date, setDate] = useState(initialDate);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (date) {
            fetchPhoto();
        } else {
            setPhotoData(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    const fetchPhoto = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}${date ? `&date=${date}` : ''}`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.code && data.code !== 200) {
                throw new Error(data.msg || 'Failed to fetch data');
            }

            setPhotoData(data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const isHero = displayMode === 'hero';

    return (
        <div className={`nasa-section ${displayMode} ${className} ${photoData ? 'has-data' : ''}`}>
            <div className="nasa-content">
                <div className="nasa-controls">
                    {isHero && <h2 className="hero-title">Picture of the Day</h2>}
                    {customTitle && <div className="section-title">{customTitle}</div>}

                    {enableDatePicker && (
                        <div className="date-picker-container">
                            <label htmlFor="date-picker" className="custom-date-button">
                                {date ? `Selected: ${date}` : 'Select a Date'}
                            </label>
                            <input
                                type="date"
                                id="date-picker"
                                value={date}
                                onChange={handleDateChange}
                                max={new Date().toISOString().split("T")[0]}
                            />
                        </div>
                    )}

                    {!loading && !error && !photoData && !isHero && (
                        <div className="empty-state">
                            <p>Pick a date to explore the cosmos.</p>
                        </div>
                    )}
                </div>

                <div className="nasa-display">
                    {loading && <div className="loading">Loading space data...</div>}
                    {error && <div className="error">Error: {error}</div>}

                    {!loading && !error && photoData && (
                        <div className="media-container">
                            {photoData.media_type === 'image' ? (
                                <img src={photoData.url} alt={photoData.title} className="nasa-media" />
                            ) : (
                                <iframe
                                    title="space-video"
                                    src={photoData.url}
                                    frameBorder="0"
                                    gesture="media"
                                    allow="encrypted-media"
                                    allowFullScreen
                                    className="nasa-media"
                                />
                            )}
                            <div className="info">
                                <h3>{photoData.title}</h3>
                                {isHero && (
                                    <div className="hero-description">
                                        <p>{photoData.explanation}</p>
                                    </div>
                                )}

                                {!isHero && (
                                    <>
                                        <p className="date">{photoData.date}</p>
                                        <p className="explanation">{photoData.explanation}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NasaSection;
