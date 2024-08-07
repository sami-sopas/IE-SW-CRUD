//Referencias para usar entity framework
using Backend.Models;
using Microsoft.EntityFrameworkCore;

using Backend.Services.Contract;
using Backend.Services.Implementation;

//Referencia automapper
using AutoMapper;
using Backend.DTOs;
using Microsoft.Extensions.DependencyInjection;
using Backend.Utilities;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DbmoviesContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

//Implementar servicios
builder.Services.AddScoped<IDirectorService, DirectorService>();
builder.Services.AddScoped<IMovieService, MovieService>();

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

//Configuracion de CORS (Para evitar conflictos entre url api y url angular
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyPolicy", app =>
    {
        app.AllowAnyOrigin();
        app.AllowAnyHeader();
        app.AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

#region API REST PETICIONES
app.MapGet("/directors", async (
    IDirectorService _directorService,
    IMapper _mapper
    ) =>
{
    List<Director> directors = await _directorService.GetList();
    List<DirectorDTO> directorsDTO = _mapper.Map<List<DirectorDTO>>(directors);

    if(directorsDTO.Count > 0)
    {
        return Results.Ok(directorsDTO);
    }
    else
    {
        return Results.NotFound();
    }

});

app.MapGet("/movies", async (
    IMovieService _movieService,
    IMapper _mapper
    ) =>
{
    List<Movie> movies = await _movieService.GetList();
    List<MovieDTO> moviesDTO = _mapper.Map<List<MovieDTO>>(movies);

    if (moviesDTO.Count > 0)
    {
        return Results.Ok(moviesDTO);
    }
    else
    {
        return Results.NotFound();
    }

});


app.MapPost("/movie/create", async (
    MovieDTO model, //Recibir el modelo a crear
    IMovieService _movieService, //Valores ya inyectados por dependencia
    IMapper _mapper
    ) => { 

        var movie = _mapper.Map<Movie>(model); //Convertir el DTO a Model con ayuda del Mapper

        var createdMovie = await _movieService.Add(movie); //Crear el registro en la base de datos

        if(createdMovie != null)
        {
            //Regresamos siempre el DTO, no el Modelo
            return Results.Ok(_mapper.Map<MovieDTO>(createdMovie));
        }
        else
        {
            return Results.StatusCode(StatusCodes.Status500InternalServerError);
        }
});



app.MapPut("/movie/update/{idMovie}", async (
    int idMovie, //Recibir el id del modelo a actualizar
    MovieDTO model, //Recibir el modelo a actualizar
    IMovieService _movieService, //Valores ya inyectados por dependencia
    IMapper _mapper
    ) => {
        
        var movie = await _movieService.Get(idMovie); //Model

        if(movie == null)
        {
            return Results.NotFound();
        }

        var updatedMovie = _mapper.Map<Movie>(model); //DTO parameter to Model

        movie.Name = updatedMovie.Name;
        movie.Gender = updatedMovie.Gender;
        movie.Duration = updatedMovie.Duration;
        movie.Fkdirector = updatedMovie.Fkdirector;

        var response = await _movieService.Update(movie);

        if (response)
        {
            return Results.Ok(_mapper.Map<MovieDTO>(movie));
        }
        else
        {
            return Results.StatusCode(StatusCodes.Status500InternalServerError);
        }


    });
app.MapDelete("/movie/delete/{idMovie}", async (
    int idMovie,
    IMovieService _movieService
    ) => {

        var movie = await _movieService.Get(idMovie); //Return a Model

        if (movie == null)
        {
            return Results.NotFound();
        }

        var response = await _movieService.Delete(movie);

        if(response)
        {
            return Results.Ok();
        }
        else
        {
            return Results.StatusCode(StatusCodes.Status500InternalServerError);
        }

    });
#endregion

app.UseCors("MyPolicy");

app.Run();
