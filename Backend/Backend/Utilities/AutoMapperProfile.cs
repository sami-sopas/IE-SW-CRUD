using AutoMapper;
using Backend.DTOs;
using Backend.Models;
using System.Globalization;

//Clase para convertir los Models a DTOs
namespace Backend.Utilities
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            #region Director
            CreateMap<Director, DirectorDTO>().ReverseMap();
            #endregion

            #region Movie
            //De Model a DTO
            CreateMap<Movie, MovieDTO>()
                .ForMember(movieDTO =>
                movieDTO.DirectorName,
                opt => opt.MapFrom(movie => movie.FkdirectorNavigation.Name)
                )
                .ForMember(movieDTO => movieDTO.Duration,
                opt => opt.MapFrom(movie => movie.Duration.Value.ToString("hh\\:mm", CultureInfo.InvariantCulture))
               );

            //De DTO a Model
            CreateMap<MovieDTO, Movie>()
                .ForMember(movie =>
                movie.FkdirectorNavigation,
                opt => opt.Ignore()
               )
                .ForMember(movie =>
                movie.Duration,
                opt => opt.MapFrom(movieDTO => TimeSpan.ParseExact(movieDTO.Duration, "hh\\:mm", CultureInfo.InvariantCulture))
               );
            #endregion
        }
    }
}
