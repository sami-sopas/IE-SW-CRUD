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

app.MapGet("/director/{idDirector}", async (
    int idDirector,
    IDirectorService _directorService,
    IMapper _mapper
    ) =>
{
    var director = await _directorService.Get(idDirector); //Model

    if (director == null)
    {
        return Results.NotFound();
    }

    var directorDTO = _mapper.Map<DirectorDTO>(director); //Model to DTO

    return Results.Ok(directorDTO);
});

app.MapPost("/director/create", async (
    DirectorDTO model,
    IDirectorService _directorService, //Valores ya inyectados por dependencia
    IMapper _mapper
    ) => {

        var director = _mapper.Map<Director>(model); //Convertir el DTO a Model con ayuda del Mapper

        var createdDirector = await _directorService.Add(director); //Crear el registro en BD

        if (createdDirector != null)
        {
            //RegresarDTO, no model
            return Results.Ok(_mapper.Map<MovieDTO>(createdDirector));
        }
        else
        {
            return Results.StatusCode(StatusCodes.Status500InternalServerError);
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


app.MapPost("/movies/create", async (
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


app.MapPut("/director/update/{idDirector}", async (
    int idDirector, //Recibir el id del director a actualizar
    DirectorDTO directorToUpdate, //Recibir el director a actualizar
    IDirectorService directorService, //Valores ya inyectados por dependencia
    IMapper mapper
    ) =>
{

    var currentDirector = await directorService.Get(idDirector); //Modelo actual

    if (currentDirector == null)
    {
        return Results.NotFound();
    }

    var updatedDirector = mapper.Map<Director>(directorToUpdate); //Convertir DTO a Modelo

    currentDirector.Name = updatedDirector.Name;
    currentDirector.Age = updatedDirector.Age;
    currentDirector.Active = updatedDirector.Active;

    var response = await directorService.Update(currentDirector);

    if (response)
    {
        return Results.Ok(mapper.Map<MovieDTO>(currentDirector));
    }
    else
    {
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }
});

app.MapDelete("/director/delete/{idDirector}", async (
    int idDirector,
    IDirectorService _directorService
    ) => {

        var director = await _directorService.Get(idDirector); //Return a Model

        if (director == null)
        {
            return Results.NotFound();
        }

        var response = await _directorService.Delete(director);

        if (response)
        {
            return Results.Ok();
        }
        else
        {
            return Results.StatusCode(StatusCodes.Status500InternalServerError);
        }

    });



app.MapPut("/movies/update/{idMovie}", async (
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

app.MapDelete("/movies/delete/{idMovie}", async (
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
